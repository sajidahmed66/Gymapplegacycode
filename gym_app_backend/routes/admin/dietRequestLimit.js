const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const DietRequestLimit = require("../../models/DietRequestLimit");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// to get diet request limit time in the admin panel
router.get("/dietRequestLimits", [auth, admin], async(req, res) => {
    const dietRequestLimit = await DietRequestLimit.findOne();
    res.send(dietRequestLimit);
});

// to post a diet request time limit in the admin panel (not necessary in the admin panel, it is for beckend purpose)
router.post("/dietRequestLimits", [auth, admin], async(req, res) => {
    const schema = Joi.object({
        noOfDays: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    const { noOfDays } = req.body;

    let dietRequestLimit = new DietRequestLimit({
        noOfDays: noOfDays,
    });

    try {
        dietRequestLimit = await dietRequestLimit.save();
        res.send(dietRequestLimit);
    } catch (ex) {
        for (const key in ex.errors) {
            res.status(404).send(ex.errors[key].message);
        }
    }
});

// to update a diet request time limit in the admin panel
router.put("/dietRequestLimits/:id", [auth, admin], async(req, res) => {
    const schema = Joi.object({
        noOfDays: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    const { noOfDays } = req.body;

    const dietRequestLimit = await DietRequestLimit.findByIdAndUpdate(
        req.params.id, {
            noOfDays: noOfDays,
        }, { new: true }
    );

    if (!dietRequestLimit) {
        return res.status(400).send("Diet does not exist");
    }

    res.send(dietRequestLimit);
});

//export

module.exports = router;