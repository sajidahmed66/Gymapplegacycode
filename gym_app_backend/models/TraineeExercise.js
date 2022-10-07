const mongoose = require("mongoose");

const TraineeExerciseSchema = new mongoose.Schema({
    trainee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    issue: {
        type: String,
    },
    fromDate: {
        type: Date,
    },
    toDate: {
        type: Date,
    },
    appliedDate: {
        type: Date,
    },
    approvedDate: {
        type: Date,
    },
    approval: {
        type: Number,
    },
    file: {
        type: String,
    },
    flag: {
        type: Number,
    },
    exercise: [{
        exercise_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exercise",
            required: true,
        },
        sets: {
            type: Number,
            required: true,
        },
        reps: {
            type: Number,
            required: true,
        },
    }, ],
});

const TraineeExercise = mongoose.model(
    "TraineeExercise",
    TraineeExerciseSchema
);

module.exports = TraineeExercise;