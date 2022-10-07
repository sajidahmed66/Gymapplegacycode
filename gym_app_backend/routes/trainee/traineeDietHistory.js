const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const trainee = require("../../middleware/trainee");
const User = require("../../models/User");
const TraineeDietHistoris = require("../../models/traineeDietHistory");

// const TraineeDietHistoris = require("../../models/TraineeDiet");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// get all diet histories in the trainee panel for this trainee
router.get("/traineeDietHistories", [auth, trainee], async(req, res) => {
    const dietHistories = await TraineeDietHistoris.find({ trainee: req.user.id })
        .populate("traineeDietId")
        .populate("trainee", ["firstname", "lastname", "phone"]);
    // .populate('diet.diet_id')

    res.send(dietHistories);
});

// get a single diet history details in the trainee panel
router.get("/traineeDietHistories/:id", [auth, trainee], async(req, res) => {
    const dietHistory = await TraineeDietHistoris.findById(req.params.id)
        .populate("traineeDietId")
        .populate("trainee", ["firstname", "lastname", "phone"]);
    // .populate('diet.diet_id')

    if (!dietHistory) {
        return res.status(400).send("Trainee Diet History not found");
    }

    res.send(dietHistory);
});

// add a diet history for this data in the trainee panel, date will be auto collected
router.post("/traineeDietHistories", [auth, trainee], async(req, res) => {
    const schema = Joi.object({
        traineeDietId: Joi.objectId().required(),
        diet_id: Joi.array().min(1).items(Joi.objectId()).required(),
        quantity: Joi.array().min(1).items(Joi.number()).required(),
        totalCalorie: Joi.array().min(1).items(Joi.number()).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    const { traineeDietId, diet_id, quantity, totalCalorie } = req.body;

    try {
        let dietHistory = new TraineeDietHistoris({
            traineeDietId: traineeDietId,
            trainee: req.user.id,
        });

        for (let i = 0; i < diet_id.length; i++) {
            object = {};
            object["diet_id"] = diet_id[i];
            object["quantity"] = quantity[i];
            object["totalCalorie"] = totalCalorie[i];

            dietHistory.diet.push(object);
        }

        dietHistory = await dietHistory.save();
        res.send(dietHistory);
    } catch (ex) {
        for (const key in ex.errors) {
            res.status(404).send(ex.errors[key].message);
        }
    }
});

// update a single diet history in the trainee panel
router.put("/traineeDietHistories/:id", [auth, trainee], async(req, res) => {
    const schema = Joi.object({
        diet_id: Joi.array().min(1).items(Joi.objectId()).required(),
        quantity: Joi.array().min(1).items(Joi.number()).required(),
        totalCalorie: Joi.array().min(1).items(Joi.number()).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    const { diet_id, quantity, totalCalorie } = req.body;

    try {
        const dietHistory = await TraineeDietHistoris.findByIdAndUpdate(
            req.params.id, {
                trainee: req.user.id,
            }, { new: true }
        );

        for (let i = 0; i < diet_id.length; i++) {
            object = {};
            object["diet_id"] = diet_id[i];
            object["quantity"] = quantity[i];
            object["totalCalorie"] = totalCalorie[i];

            dietHistory.diet.push(object);
        }

        dietHistory.save();
        res.send(dietHistory);
    } catch (ex) {
        for (const key in ex.errors) {
            res.status(404).send(ex.errors[key].message);
        }
    }
});

//export

module.exports = router;