const mongoose = require("mongoose");

const TraineeDietSchema = new mongoose.Schema({
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
    diet: [{
        diet_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Diet",
            // required:true
        },
        quantity: {
            type: Number,
            // required:true
        },
        totalCalorie: {
            type: Number,
            // required:true
        },
    }, ],
});

const TraineeDiet = mongoose.model("TraineeDiet", TraineeDietSchema);

module.exports = TraineeDiet;