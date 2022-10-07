const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const trainee = require("../../middleware/trainee");
const User = require("../../models/User");
const TraineeDiet = require("../../models/TraineeDiet");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// to get the details of the last diet request in the trainee panel
router.get("/traineeDiets/last", [auth, trainee], async(req, res) => {
    const diet = await TraineeDiet.findOne({ trainee: req.user.id })
        .sort({ appliedDate: -1 })
        .populate("trainee", ["firstname", "lastname", "phone"])
        .populate("trainer", ["firstname", "lastname", "phone"])
        .populate("admin", ["firstname", "lastname", "phone"])
        .populate("diet.diet_id");

    res.send(diet);
});

// to get all diet requests list in the trainee panel
router.get("/traineeDiets/me", [auth, trainee], async(req, res) => {
    const diets = await TraineeDiet.find({ trainee: req.user.id }).sort({_id:-1})
        .populate("trainee", ["firstname", "lastname", "phone"])
        .populate("trainer", ["firstname", "lastname", "phone"])
        .populate("admin", ["firstname", "lastname", "phone"])
        .populate("diet.diet_id");

    res.send(diets);
});

// to get a single diet request details in the trainee panel
router.get("/traineeDiets/:id", [auth, trainee], async(req, res) => {
    const diet = await TraineeDiet.findById(req.params.id)
        .populate("trainee", ["firstname", "lastname", "phone"])
        .populate("trainer", ["firstname", "lastname", "phone"])
        .populate("admin", ["firstname", "lastname", "phone"])
        .populate("diet.diet_id");

    if (!diet) {
        return res.status(400).send("Trainee Diet not found");
    }

    res.send(diet);
});

// to send a diet request in the trainee panel
router.post("/traineeDiets", [auth, trainee], async(req, res) => {
    const schema=Joi.object({
        issue:Joi.string().required(),
    })

    const {error}=schema.validate(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const {issue} = req.body
    
    let diet = new TraineeDiet({
        trainee: req.user.id,
        issue:issue,
        appliedDate: Date.now(),
        approval: 0,
    });

    try {
        diet = await diet.save();
        res.send(diet);
    } catch (ex) {
        for (const key in ex.errors) {
            res.status(404).send(ex.errors[key].message);
        }
    }
});


router.put("/traineeDiets/:id", [auth, trainee], async(req, res) => {
    const schema=Joi.object({
        issue:Joi.string().required(),
    })

    const {error}=schema.validate(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const {issue} = req.body
    
    const diet = await TraineeDiet.findByIdAndUpdate(req.params.id,{
        issue:issue,
    },{new:true})

    if (!diet) {
        return res.status(400).send('Diet does not exist')
    }

    res.send(diet)

   
});

//export

module.exports = router;