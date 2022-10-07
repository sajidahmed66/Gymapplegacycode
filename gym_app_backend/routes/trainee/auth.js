const auth = require("../../middleware/auth");
const trainee = require("../../middleware/trainee");
const User = require("../../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const router = express.Router();
var unirest = require('unirest');

// to post data for login purpose in the trainee panel
router.post("/auth", async(req, res) => {
    const schema = Joi.object({
        phone: Joi.string().min(11).required(),
        password: Joi.string().min(6).max(255).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    let trainee = await User.findOne({ phone: req.body.phone, userRole: 3 });

    if (!trainee) {
        return res.status(404).send("Invalid phone or password");
    }

    const validPassword = await bcrypt.compare(
        req.body.password,
        trainee.password
    );

    if (!validPassword) {
        return res.status(404).send("Invalid phone or password");
    }

    const payload = {
        user: {
            id: trainee.id,
            userRole: trainee.userRole,
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

// to change password in the trainee panel
router.post("/changePassword", [auth, trainee], async(req, res) => {
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

    let trainee = await User.findOne({ _id: req.user.id, userRole: 3 });

    if (trainee != null) {
        const validPassword = await bcrypt.compare(oldPassword, trainee.password);

        if (!validPassword) {
            return res.status(404).send("Please Enter Correct Current Password");
        }

        if (newPassword != confirmPassword) {
            return res.status(400).send("New Password & Confirm Password Must Match");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        trainee.password = hashedPassword;

        try {
            trainee = await trainee.save();

            res.send(trainee);
        } catch (ex) {
            for (const key in ex.errors) {
                return res.status(404).send(ex.errors[key].message);
            }
        }
    }
});


router.post("/forgetPassword", async (req, res) => {
    const schema = Joi.object({
        phone: Joi.string().min(11).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    let trainee = await User.findOne({ phone: req.body.phone, userRole: 3 });

    if (!trainee) {
        return res.status(404).send("Your Phone Number is not registered");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordUnhashed = Math.random().toString(36).substr(2, 8);
    const hashedPassword = await bcrypt.hash(passwordUnhashed, salt);

    trainee.password=hashedPassword

    //SMS Gateway

    var username="01918184015"
    var password="FB72C69Z"
    var number=trainee.phone
    var message=`Hello ${trainee.firstname} ${trainee.lastname}, Your Login Number: ${trainee.phone} Password:${passwordUnhashed}`

    var req = unirest('POST', 'http://66.45.237.70/api.php?username='+username+'&password='+password+'&number='+number+'&message='+message)
        .headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        .send("")
        .end(function (res) { 
            if (res.error) throw new Error(res.error); 
            console.log(res.raw_body);
        });

    try {
        
        trainee = await trainee.save();
        res.send('Your Password Has Been Sent');
    
    } catch (ex) {
        for (const key in ex.errors) {
            return res.status(404).send(ex.errors[key].message);
        }
    }




   
});

//export

module.exports = router;