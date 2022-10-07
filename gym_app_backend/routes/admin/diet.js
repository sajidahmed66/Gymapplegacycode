const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const Diet = require("../../models/Diet");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// to get all diet type list in the admin panel
router.get("/diets", [auth, admin], async(req, res) => {
    const diets = await Diet.find().sort({_id:-1}).populate("entryBy", [
        "firstname",
        "lastname",
    ]);

    res.send(diets);
});

// to get a single diet type details in the admin panel
router.get("/diets/:id", [auth, admin], async(req, res) => {
    const diet = await Diet.findById(req.params.id);

    if (!diet) {
        return res.status(400).send("Diet not found");
    }

    res.send(diet);
});

// to add a single diet type details in the admin panel
router.post("/diets", [auth, admin], async(req, res) => {
    const schema = Joi.object({
        name: Joi.string().max(255).required(),
        quantity: Joi.number().required(),
        unit: Joi.string().max(255).required(),
        calorie: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    const { name, quantity, unit, calorie } = req.body;

    let diet = new Diet({
        name: name,
        quantity: quantity,
        unit: unit,
        calorie: calorie,
        entryBy: req.user.id,
    });

    try {
        diet = await diet.save();
        const diets = await Diet.find().sort({_id:-1}).populate("entryBy", [
            "firstname",
            "lastname",
        ]);
        res.send(diets);
    } catch (ex) {
        for (const key in ex.errors) {
            res.status(404).send(ex.errors[key].message);
        }
    }
});

// to edit a single diet type details in the admin panel
router.put("/diets/:id", [auth, admin], async(req, res) => {
    const schema = Joi.object({
        name: Joi.string().max(255).required(),
        quantity: Joi.number().required(),
        unit: Joi.string().max(255).required(),
        calorie: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    const { name, quantity, unit, calorie } = req.body;

    const diet = await Diet.findByIdAndUpdate(
        req.params.id, {
            name: name,
            quantity: quantity,
            unit: unit,
            calorie: calorie,
            entryBy: req.user.id,
        }, { new: true }
    );

    const diets = await Diet.find().sort({_id:-1}).populate("entryBy", [
        "firstname",
        "lastname",
    ]);

    if (!diet) {
        return res.status(400).send("Diet does not exist");
    }

    res.send(diets);
});

// to delete a single diet type details in the admin panel
router.delete("/diets/:id", [auth, admin], async(req, res) => {
    const diet = await Diet.findByIdAndRemove(req.params.id);

    if (!diet) {
        return res.status(404).send("Diet not found");
    }
    const diets = await Diet.find().sort({_id:-1}).populate("entryBy", [
        "firstname",
        "lastname",
    ]);
    res.send(diets);
});

//export

module.exports = router;