const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const trainee = require("../../middleware/trainee");
const Payment = require("../../models/Payment");
const Package = require("../../models/Package");
const User = require("../../models/User");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

router.get("/payments", [auth, trainee], async(req, res) => {
    const payments = await Payment.find({ trainee: req.user.id })
        .sort({ _id: -1 })
        .populate("trainee", ["firstname", "lastname"]);
    res.send(payments);
});

router.get("/payments/:id", [auth, trainee], async(req, res) => {
    const payment = await Payment.findById(req.params.id).populate("trainee", [
        "firstname",
        "lastname",
    ]);
    if (!payment) {
        return res.status(400).send("Payment not found");
    }

    res.send(payment);
});

module.exports = router;