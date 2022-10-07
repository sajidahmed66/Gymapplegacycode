const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const trainee = require("../../middleware/trainee");
const DietRequestLimit = require("../../models/DietRequestLimit");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// to get diet request limit time in the admin panel
router.get("/dietRequestLimits", [auth, trainee], async(req, res) => {
    const dietRequestLimit = await DietRequestLimit.findOne();
    res.send(dietRequestLimit);
});


//export

module.exports = router;