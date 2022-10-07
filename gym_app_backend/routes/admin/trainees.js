const Payment = require("../../models/Payment");
const Package = require("../../models/Package");
const User = require("../../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const { populate } = require("../../models/User");
var unirest = require('unirest');

//to get all trainees list in the admin panel
router.get("/trainees", [auth, admin], async(req, res) => {
    const trainees = await User.find({ userRole: 3 }).sort({_id:-1}).select("-password")
    // console.log(trainees)

    res.send(trainees);
});

// to get a single trainee details in the admin panel
router.get("/trainees/:id", [auth, admin], async(req, res) => {
    const trainee = await User.findOne({ userRole: 3, id: req.params.id }).select(
        "-password"
    );

    if (!trainee) {
        res.status(400).send("Trainee does not exists");
    }

    res.send(trainee);
});

// to add a trainee in the admin panel
router.post("/trainees", [auth, admin], async(req, res) => {
    // Validation
    const schema = Joi.object({
        firstname: Joi.string().max(255).required(),
        lastname: Joi.string().max(255).required(),
        phone: Joi.number().min(11).required(),
        subscriptionType: Joi.number().required(),
        packageType: Joi.objectId(),
        totalAmount: Joi.number().required(),
        registrationAmount: Joi.number().required(),
        subscriptionAmount: Joi.number().required(),
        paidAmount: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const {
        firstname,
        lastname,
        phone,
        subscriptionType,
        packageType,
        totalAmount,
        registrationAmount,
        subscriptionAmount,
        paidAmount,
    } = req.body;

    //Logic

    let trainee = await User.findOne({ phone: phone });

    if (trainee) {
        return res.status(404).send("Phone Number Already Exists");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordUnhashed = Math.random().toString(36).substr(2, 8);
    console.log(passwordUnhashed)
    const hashedPassword = await bcrypt.hash(passwordUnhashed, salt);

    subscription = {};
    subscription["type"] = subscriptionType
    subscription["packageType"] = packageType

    installment = {};
    installment["amount"] = paidAmount, 
    installment["date"] = new Date();

    if (subscriptionType == 1) {
        var now = new Date();
        var nextPaymentDate = now.setMonth(now.getMonth() + 1, 10);
        var due = totalAmount - paidAmount;
    } else if (subscriptionType == 2) {
        const package = await Package.findById(packageType);
        var now = new Date();
        var nextPaymentDate = now.setDate(now.getDate() + package.time_duration);
        var due = totalAmount - paidAmount;
    }

    trainee = new User({
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        password: hashedPassword,
        userRole: 3,
        subscription: subscription,
        nextPaymentDate: nextPaymentDate,
    });

    //SMS Gateway

    var username="01918184015"
    var password="FB72C69Z"
    var number=phone
    var message=`Hello ${firstname} ${lastname},We have received your payment of ${paidAmount} Tk. Your Login Number: ${phone} Password:${passwordUnhashed}`

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

        payment = new Payment({
            trainee: trainee.id,
            subscription: subscription,
            totalAmount: totalAmount,
            registrationAmount: registrationAmount,
            subscriptionAmount: subscriptionAmount,
            paidAmount: paidAmount,
            dueAmount: due,
            // installment:installment
        });

        payment.installment.push(installment);

        payment = await payment.save();

        const trainees = await User.find({ userRole: 3 }).sort({_id:-1})

        res.send(trainees);
    } catch (ex) {
        for (const key in ex.errors) {
            return res.status(404).send(ex.errors[key].message);
        }
    }
});

//export

module.exports = router;