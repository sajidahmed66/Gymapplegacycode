const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const TrainerPayment = require("../../models/TrainerPayment");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// to get all trainer payment list in the admin panel
router.get("/trainerPayments", [auth, admin], async(req, res) => {
    const payments = await TrainerPayment.find()
        .sort({ _id: -1 })
        .populate("trainer", ["firstname", "lastname"]);
    res.send(payments);
});

// to get a single trainer payment details in the admin panel
router.get("/trainerPayments/:id", [auth, admin], async(req, res) => {
    const payment = await TrainerPayment.findById(
        req.params.id
    ).populate("trainer", ["firstname", "lastname"]);

    if (!payment) {
        return res.status(400).send("Payment not found");
    }

    res.send(payment);
});

// to add a new trainer payments in the admin panel
router.post("/trainerPayments", [auth, admin], async(req, res) => {
    const schema = Joi.object({
        trainer: Joi.objectId().required(),
        amount: Joi.number().required(),
        date: Joi.date().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    const { trainer, amount, date } = req.body;

    let payment = new TrainerPayment({
        trainer: trainer,
        amount: amount,
        date: date,
    });
    
    try {
        payment = await payment.save();
        const payments = await TrainerPayment.find()
        .sort({ _id: -1 })
        .populate("trainer", ["firstname", "lastname"]);
        
        res.send(payments);
    } catch (ex) {
        for (const key in ex.errors) {
            res.status(404).send(ex.errors[key].message);
        }
    }
});

// to update a trainer payment details in the admin panel
router.put("/trainerPayments/:id", [auth, admin], async(req, res) => {
    const schema = Joi.object({
        trainer: Joi.objectId().required(),
        amount: Joi.number().required(),
        date: Joi.date().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    const { trainer, amount, date } = req.body;

    const payment = await TrainerPayment.findByIdAndUpdate(
        req.params.id, {
            trainer: trainer,
            amount: amount,
            date: date,
        }, { new: true }
    );

    const payments = await TrainerPayment.find()
        .sort({ _id: -1 })
        .populate("trainer", ["firstname", "lastname"]);

    if (!payment) {
        return res.status(400).send("Payment does not exist");
    }

    res.send(payments);
});

// to delete a single payment details in the admin panel
router.delete("/trainerPayments/:id", [auth, admin], async(req, res) => {
    const payment = await TrainerPayment.findByIdAndRemove(req.params.id);

    if (!payment) {
        return res.status(404).send("Payment not found");
    }

    const payments = await TrainerPayment.find()
        .sort({ _id: -1 })
        .populate("trainer", ["firstname", "lastname"]);

    res.send(payments);
});

//export

module.exports = router;