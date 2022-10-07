const mongoose = require("mongoose");

const DietSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    calorie: {
        type: Number,
        required: true,
    },
    entryBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Diet = mongoose.model("Diet", DietSchema);

module.exports = Diet;