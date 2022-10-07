const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const User = require("../../models/User");
const TraineeExercise = require("../../models/TraineeExercise");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// to get all trainee exercise request list in the admin panel
router.get("/traineeExercises", [auth, admin], async(req, res) => {
    const exercises = await TraineeExercise.find().sort({_id:-1})
        .populate("trainee", ["firstname", "lastname", "phone"])
        .populate("trainer", ["firstname", "lastname", "phone"])
        .populate("admin", ["firstname", "lastname", "phone"])
        .populate("exercise.exercise_id");

    res.send(exercises);
});

// to get a single trainee exercise details in the admin panel
router.get("/traineeExercises/:id", [auth, admin], async(req, res) => {
    const exercise = await TraineeExercise.findById(req.params.id)
        .populate("trainee", ["firstname", "lastname", "phone"])
        .populate("trainer", ["firstname", "lastname", "phone"])
        .populate("admin", ["firstname", "lastname", "phone"])
        .populate("exercise.exercise_id");

    if (!exercise) {
        return res.status(400).send("Trainee Exercise not found");
    }

    res.send(exercise);
});

// to assign a trainer in a trainee exercise request in the admin panel
router.post("/traineeExercises", [auth, admin], async(req, res) => {
    const schema = Joi.object({
        trainer: Joi.objectId().required(),
        traineeExerciseId: Joi.objectId().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    const { trainer, traineeExerciseId } = req.body;

    try {
        const exercise = await TraineeExercise.findByIdAndUpdate(
            traineeExerciseId, {
                admin: req.user.id,
                trainer: trainer,
            }, { new: true }
        );

        res.send(exercise);
    } catch (ex) {
        for (const key in ex.errors) {
            res.status(404).send(ex.errors[key].message);
        }
    }
});

//export

module.exports = router;