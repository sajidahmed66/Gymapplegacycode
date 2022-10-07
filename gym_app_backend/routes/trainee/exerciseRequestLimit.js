const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const trainee = require("../../middleware/trainee");
const ExerciseRequestLimit = require("../../models/ExerciseRequestLimit");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);


router.get("/exerciseRequestLimits", [auth, trainee], async(req, res) => {
    const exerciseRequestLimit = await ExerciseRequestLimit.findOne()
    res.send(exerciseRequestLimit);
});

//export

module.exports = router;