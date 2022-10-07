const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const ExerciseRequestLimit = require("../../models/ExerciseRequestLimit");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);


router.get("/exerciseRequestLimits", [auth, admin], async(req, res) => {
    const exerciseRequestLimit = await ExerciseRequestLimit.findOne()
    res.send(exerciseRequestLimit);
});


router.post("/exerciseRequestLimits", [auth, admin], async(req, res) => {
    const schema = Joi.object({
        noOfDays: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    const { noOfDays } = req.body;

    let exerciseRequestLimit = new ExerciseRequestLimit({
        noOfDays: noOfDays,
    });

    try {
        exerciseRequestLimit = await exerciseRequestLimit.save();
        res.send(exerciseRequestLimit);
    } catch (ex) {
        for (const key in ex.errors) {
            res.status(404).send(ex.errors[key].message);
        }
    }
});


router.put("/exerciseRequestLimits/:id", [auth, admin], async(req, res) => {
    const schema = Joi.object({
        noOfDays: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    const { noOfDays } = req.body;

    const exerciseRequestLimit = await ExerciseRequestLimit.findByIdAndUpdate(
        req.params.id, {
            noOfDays: noOfDays,
        }, { new: true }
    );

    if (!exerciseRequestLimit) {
        return res.status(400).send("Diet does not exist");
    }

    res.send(exerciseRequestLimit);
});

//export

module.exports = router;