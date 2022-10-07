const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const trainer = require("../../middleware/trainer");
const User = require("../../models/User");
const Exercise = require("../../models/Exercise");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// to get all exercise type list in the trainer panel
router.get("/exercises", [auth, trainer], async(req, res) => {
    const exercises = await Exercise.find().sort({_id:-1}).populate("entryBy", [
        "firstname",
        "lastname",
    ]);

    res.send(exercises);
});

// to get a single exercise type details in the trainer panel
router.get("/exercises/:id", [auth, trainer], async(req, res) => {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
        return res.status(400).send("Exercise not found");
    }

    res.send(exercise);
});

// to add a new exercise type in the trainer panel
router.post("/exercises", [auth, trainer], async(req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        // description: Joi.string(),
    });

    const { error } = schema.validate(req.body,{ allowUnknown: true });

    if (error) {
        return res.status(400).send(error.details);
    }

    const { name, description } = req.body;

    let exercise = new Exercise({
        name: name,
        description: description,
        entryBy: req.user.id,
    });

    try {
        exercise = await exercise.save();
        const exercises = await Exercise.find().sort({_id:-1}).populate("entryBy", [
            "firstname",
            "lastname",
        ]);
        res.send(exercises);
    } catch (ex) {
        for (const key in ex.errors) {
            res.status(404).send(ex.errors[key].message);
        }
    }
});

// to update a existing exercise type in the trainer panel
router.put("/exercises/:id", [auth, trainer], async(req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        // description: Joi.string(),
    });

    const { error } = schema.validate(req.body,{ allowUnknown: true });

    if (error) {
        return res.status(400).send(error.details);
    }

    const { name, description } = req.body;

    const exercise = await Exercise.findByIdAndUpdate(
        req.params.id, {
            name: name,
            description: description,
        }, { new: true }
    );
    const exercises = await Exercise.find().sort({_id:-1}).populate("entryBy", [
        "firstname",
        "lastname",
    ]);

    if (!exercise) {
        return res.status(400).send("Exercise does not exist");
    }

    res.send(exercises);
});

// to delete a exercise type in the trainer panel
router.delete("/exercises/:id", [auth, trainer], async(req, res) => {
    const exercise = await Exercise.findByIdAndRemove(req.params.id);

    if (!exercise) {
        return res.status(404).send("Exercise not found ");
    }
    const exercises = await Exercise.find().sort({_id:-1}).populate("entryBy", [
        "firstname",
        "lastname",
    ]);
    res.send(exercises);
});

//export

module.exports = router;