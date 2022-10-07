const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const trainee = require("../../middleware/trainee");
const User = require("../../models/User");
const TraineeExerciseHistory = require("../../models/TraineeExerciseHistory");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// to get all exercise report history list in the trainee panel
router.get("/traineeExerciseHistories", [auth, trainee], async(req, res) => {
    const exerciseHistories = await TraineeExerciseHistory.find({
            trainee: req.user.id,
        })
        .populate("traineeExerciseId")
        .populate("trainee", ["firstname", "lastname", "phone"])
        .populate("exercise.exercise_id");

    res.send(exerciseHistories);
});

// to get a single exercise report history details in the trainee panel
router.get(
    "/traineeExerciseHistories/:id", [auth, trainee],
    async(req, res) => {
        const exerciseHistory = await TraineeExerciseHistory.findById(req.params.id)
            .populate("traineeExerciseId")
            .populate("trainee", ["firstname", "lastname", "phone"])
            .populate("exercise.exercise_id");

        if (!exerciseHistory) {
            return res.status(400).send("Trainee Exercise History not found");
        }

        res.send(exerciseHistory);
    }
);

// to send a exercise history report in the trainee panel
router.post("/traineeExerciseHistories", [auth, trainee], async(req, res) => {
    const schema = Joi.object({
        traineeExerciseId: Joi.objectId().required(),
        workout_id: Joi.array().min(1).items(Joi.objectId()).required(),
        sets: Joi.array().min(1).items(Joi.number()).required(),
        reps: Joi.array().min(1).items(Joi.number()).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    const { traineeExerciseId, workout_id, sets, reps } = req.body;

    try {
        let exerciseHistory = new TraineeExerciseHistory({
            traineeExerciseId: traineeExerciseId,
            trainee: req.user.id,
        });

        for (let i = 0; i < workout_id.length; i++) {
            object = {};
            object["exercise_id"] = workout_id[i];
            object["sets"] = sets[i];
            object["reps"] = reps[i];

            exerciseHistory.exercise.push(object);
        }

        exerciseHistory = await exerciseHistory.save();
        res.send(exerciseHistory);
    } catch (ex) {
        for (const key in ex.errors) {
            res.status(404).send(ex.errors[key].message);
        }
    }
});

// to update a single exercise history report in the trainee panel
router.put(
    "/traineeExerciseHistories/:id", [auth, trainee],
    async(req, res) => {
        const schema = Joi.object({
            workout_id: Joi.array().min(1).items(Joi.objectId()).required(),
            sets: Joi.array().min(1).items(Joi.number()).required(),
            reps: Joi.array().min(1).items(Joi.number()).required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details);
        }

        const { workout_id, sets, reps } = req.body;

        try {
            const exerciseHistory = await TraineeExerciseHistory.findByIdAndUpdate(
                req.params.id, {
                    trainee: req.user.id,
                }, { new: true }
            );

            for (let i = 0; i < workout_id.length; i++) {
                object = {};
                object["exercise_id"] = workout_id[i];
                object["sets"] = sets[i];
                object["reps"] = reps[i];

                exerciseHistory.exercise.push(object);
            }

            exerciseHistory.save();
            res.send(exerciseHistory);
        } catch (ex) {
            for (const key in ex.errors) {
                res.status(404).send(ex.errors[key].message);
            }
        }
    }
);

//export

module.exports = router;