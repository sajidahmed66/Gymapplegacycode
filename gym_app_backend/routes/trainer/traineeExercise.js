const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const trainer = require("../../middleware/trainer");
const User = require("../../models/User");
const TraineeExercise = require("../../models/TraineeExercise");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const multer = require('multer')
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/exerciseFile')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    // Allowed ext
    const filetypes = /pdf|doc|xlsx|xls|csv/;

    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Please Select Pdf, Document, Excel file!");
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});

// to get all trainee exercise request list in the trainer panel
router.get("/traineeExercises", [auth, trainer], async (req, res) => {
    const exercises = await TraineeExercise.find({ trainer: req.user.id })
        .sort({ _id: -1 })
        .populate("trainee", ["firstname", "lastname", "phone"])
        .populate("trainer", ["firstname", "lastname", "phone"])
        .populate("admin", ["firstname", "lastname", "phone"])
        .populate("exercise.exercise_id");

    res.send(exercises);
});

// to get a single exercise request details in the trainer panel
router.get("/traineeExercises/:id", [auth, trainer], async (req, res) => {
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

// to assign exercises to a trainee exercise request in the trainer panel
router.post(
    "/traineeExercises", [auth, trainer, upload.single("file")],
    async (req, res) => {
        if (req.body.flag == 1) {
            const schema = Joi.object({
                fromDate: Joi.date().required(),
                toDate: Joi.date().required(),
                traineeExerciseId: Joi.objectId().required(),
                workout_id: Joi.array().min(1).items(Joi.objectId()).required(),
                sets: Joi.array().min(1).items(Joi.number()).required(),
                reps: Joi.array().min(1).items(Joi.number()).required(),
                flag: Joi.number().required(),
            });

            const { error } = schema.validate(req.body);

            if (error) {
                return res.status(400).send(error.details);
            }

            const {
                fromDate,
                toDate,
                traineeExerciseId,
                workout_id,
                sets,
                reps,
                flag,
            } = req.body;

            try {
                const exercise = await TraineeExercise.findByIdAndUpdate(
                    traineeExerciseId, {
                    fromDate: fromDate,
                    toDate: toDate,
                    approval: 1,
                    flag: flag,
                    approvedDate: Date.now(),
                }, { new: true }
                );

                for (let i = 0; i < workout_id.length; i++) {
                    object = {};
                    object["exercise_id"] = workout_id[i];
                    object["sets"] = sets[i];
                    object["reps"] = reps[i];

                    exercise.exercise.push(object);
                }
                exercise.save();
                return res.send(exercise);
            } catch (ex) {
                for (const key in ex.errors) {
                    res.status(404).send(ex.errors[key].message);
                }
            }
        } else if (req.body.flag == 2) {
            const schema = Joi.object({
                fromDate: Joi.date().required(),
                toDate: Joi.date().required(),
                traineeExerciseId: Joi.objectId().required(),
                flag: Joi.number().required(),
            });

            const { error } = schema.validate(req.body);

            if (error) {
                return res.status(400).send(error.details);
            }

            const { fromDate, toDate, traineeExerciseId, flag } = req.body;

            try {
                const exercise = await TraineeExercise.findByIdAndUpdate(
                    traineeExerciseId, {
                    fromDate: fromDate,
                    toDate: toDate,
                    approval: 1,
                    flag: flag,
                    file: req.file.path,
                    approvedDate: Date.now(),
                }, { new: true }
                );
                return res.send(exercise);
            } catch (ex) {
                for (const key in ex.errors) {
                    res.status(404).send(ex.errors[key].message);
                }
            }
        }
    }
);

// to update a exercise details in the trainer panel
router.put(
    "/traineeExercises/:id", [auth, trainer, upload.single("file")],
    async (req, res) => {
        if (req.body.flag == 1) {
            const schema = Joi.object({
                fromDate: Joi.date().required(),
                toDate: Joi.date().required(),
                workout_id: Joi.array().min(1).items(Joi.objectId()).required(),
                sets: Joi.array().min(1).items(Joi.number()).required(),
                reps: Joi.array().min(1).items(Joi.number()).required(),
                flag: Joi.number().required(),
            });

            const { error } = schema.validate(req.body);

            if (error) {
                return res.status(400).send(error.details);
            }

            const { fromDate, toDate, workout_id, sets, reps, flag } = req.body;

            try {
                const exercise = await TraineeExercise.findByIdAndUpdate(
                    req.params.id, {
                    fromDate: fromDate,
                    toDate: toDate,
                    flag: flag,
                }, { new: true }
                );

                exercise.exercise = [];

                for (let i = 0; i < workout_id.length; i++) {
                    object = {};
                    object["exercise_id"] = workout_id[i];
                    object["sets"] = sets[i];
                    object["reps"] = reps[i];

                    exercise.exercise.push(object);
                }

                exercise.save();
                return res.send(exercise);
            } catch (error) {
                for (const key in ex.errors) {
                    res.status(404).send(ex.errors[key].message);
                }
            }
        } else if (req.body.flag == 2) {
            const schema = Joi.object({
                fromDate: Joi.date().required(),
                toDate: Joi.date().required(),
                flag: Joi.number().required(),
            });

            const { error } = schema.validate(req.body);

            if (error) {
                return res.status(400).send(error.details);
            }

            const { fromDate, toDate, flag } = req.body;

            try {
                const exercise = await TraineeExercise.findByIdAndUpdate(
                    req.params.id, {
                    fromDate: fromDate,
                    toDate: toDate,
                    flag: flag,
                    file: req.file.path,
                }, { new: true }
                );
                return res.send(exercise);
            } catch (error) {
                for (const key in ex.errors) {
                    res.status(404).send(ex.errors[key].message);
                }
            }
        }
    }
);

//export

module.exports = router;