const mongoose = require("mongoose");

const TraineeDietHistorySchema = new mongoose.Schema({
    traineeDietId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TraineeDiet",
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
    diet: [{
        diet_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Diet",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        totalCalorie: {
            type: Number,
            required: true,
        },
    }, ],
});

const TraineeDietHistory = mongoose.model(
    "TraineeDietHistory",
    TraineeDietHistorySchema
);

module.exports = TraineeDietHistory;