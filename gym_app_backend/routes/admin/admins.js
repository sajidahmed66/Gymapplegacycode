const User = require("../../models/User");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

//Routes

// to add a new admin in the admin panel
router.post("/admins", async(req, res) => {
    // Validation
    const schema = Joi.object({
        firstname: Joi.string().max(255).required(),
        lastname: Joi.string().max(255).required(),
        phone: Joi.number().min(11).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { firstname, lastname, phone } = req.body;

    //Logic

    let admin = await User.findOne({ phone: phone });

    if (admin) {
        return res.status(404).send("Phone Number Already Exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);

    admin = new User({
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        password: hashedPassword,
        userRole: 1,
    });

    try {
        admin = await admin.save();
        res.send("Registration Complete");
    } catch (ex) {
        for (const key in ex.errors) {
            return res.status(404).send(ex.errors[key].message);
        }
    }
});

//export

module.exports = router;