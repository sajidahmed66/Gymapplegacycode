const mongoose = require("mongoose");

const TraineeExerciseHistorySchema = new mongoose.Schema({
    traineeExerciseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TraineeExercise",
        required: true,
    },
    trainee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
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

const TraineeExerciseHistory = mongoose.model(
    "TraineeExerciseHistory",
    TraineeExerciseHistorySchema
);

module.exports = TraineeExerciseHistory;