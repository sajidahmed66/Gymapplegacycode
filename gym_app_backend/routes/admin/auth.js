const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const User = require("../../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

// to post data for login purpose in the admin panel
router.post("/auth", async(req, res) => {
    const schema = Joi.object({
        phone: Joi.string().min(11).required(),
        password: Joi.string().min(6).max(255).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    let admin = await User.findOne({ phone: req.body.phone, userRole: 1 });

    if (!admin) {
        return res
            .status(404)
            .send({ errors: [{ msg: "Invalid phone or password" }] });
    }

    const validPassword = await bcrypt.compare(req.body.password, admin.password);

    if (!validPassword) {
        return res
            .status(404)
            .send({ errors: [{ msg: "Invalid phone or password" }] });
    }

    const payload = {
        user: {
            id: admin.id,
            userRole: admin.userRole,
        },
    };

    jwt.sign(
        payload,
        config.get("jwtSecret"), { expiresIn: "12h" },
        (err, token) => {
            if (err) {
                throw err;
            }

            res.send({ token });
        }
    );

    res.send(token);
});

// to change password of admin in the admin panel
router.post("/changePassword", [auth, admin], async(req, res) => {
    // Validation
    const schema = Joi.object({
        oldPassword: Joi.string().min(6).required(),
        newPassword: Joi.string().min(6).required(),
        confirmPassword: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { oldPassword, newPassword, confirmPassword } = req.body;

    //Logic

    let admin = await User.findOne({ _id: req.user.id, userRole: 1 });

    if (admin != null) {
        const validPassword = await bcrypt.compare(oldPassword, admin.password);

        if (!validPassword) {
            return res.status(404).send("Please Enter Correct Current Password");
        }

        if (newPassword != confirmPassword) {
            return res.status(400).send("New Password & Confirm Password Must Match");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        admin.password = hashedPassword

        try {
          admin = await admin.save()

          res.send(admin)
        } catch (ex) {
          for (const key in ex.errors) {
            return res.status(404).send(ex.errors[key].message)
          }
        }
    }
});

//export

module.exports = router;