const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const trainer = require("../../middleware/trainer");
const User = require("../../models/User");
const Profile = require("../../models/UserProfile");
const Joi = require("joi");
const TraineeImage = require("../../models/TraineeImage");
Joi.objectId = require("joi-objectid")(Joi);

//Routes

router.post("/trainee/images", [auth, trainer], async(req, res) => {
    const images = await TraineeImage.find({ trainee: req.body.traineeId }).sort({
        _id: -1,
    });

    res.send(images);
});

//export

module.exports = router;