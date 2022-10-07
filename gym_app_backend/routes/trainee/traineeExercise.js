const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const trainee = require("../../middleware/trainee");
const User = require("../../models/User");
const TraineeExercise = require("../../models/TraineeExercise");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// to get the information of last exercise request details in the trainee panel
router.get("/traineeExercises/last", [auth, trainee], async(req, res) => {
    const exercise = await TraineeExercise.findOne({ trainee: req.user.id })
        .sort({ appliedDate: -1 })
        .populate("trainee", ["firstname", "lastname", "phone"])
        .populate("trainer", ["firstname", "lastname", "phone"])
        .populate("admin", ["firstname", "lastname", "phone"])
        .populate("exercise.exercise_id");

    res.send(exercise);
});

// to get all exercise request list in the trainee panel
router.get("/traineeExercises/me", [auth, trainee], async(req, res) => {
    const exercises = await TraineeExercise.find({ trainee: req.user.id }).sort({_id:-1})
        .populate("trainee", ["firstname", "lastname", "phone"])
        .populate("trainer", ["firstname", "lastname", "phone"])
        .populate("admin", ["firstname", "lastname", "phone"])
        .populate("exercise.exercise_id");

    res.send(exercises);
});

// to get a single exercise request details in the trainee panel
router.get("/traineeExercises/:id", [auth, trainee], async(req, res) => {
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

// to send a exercise request in the trainee panel
router.post("/traineeExercises", [auth, trainee], async(req, res) => {
    const schema=Joi.object({
        issue:Joi.string().required(),
    })

    const {error}=schema.validate(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const {issue} = req.body
    
    let exercise = new TraineeExercise({
        trainee: req.user.id,
        issue:issue,
        appliedDate: Date.now(),
        approval: 0,
    });

    try {
        exercise = await exercise.save();
        res.send(exercise);
    } catch (ex) {
        for (const key in ex.errors) {
            res.status(404).send(ex.errors[key].message);
        }
    }
});


router.put("/traineeExercises/:id", [auth, trainee], async(req, res) => {
    const schema=Joi.object({
        issue:Joi.string().required(),
    })

    const {error}=schema.validate(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const {issue} = req.body
    
    const exrecise = await TraineeExercise.findByIdAndUpdate(req.params.id,{
        issue:issue,
    },{new:true})

    if (!exrecise) {
        return res.status(400).send('Exrecise does not exist')
    }

    res.send(exrecise)

   
});

//export

module.exports = router;