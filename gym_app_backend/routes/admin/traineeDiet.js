const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const User = require("../../models/User");
const Profile = require('../../models/UserProfile')
const TraineeDiet = require("../../models/TraineeDiet");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// to get all trainee diet request list in the admin panel
router.get("/traineeDiets", [auth, admin], async(req, res) => {
    const diets = await TraineeDiet
        .find()
        .sort({_id:-1})
        .populate("trainee", ["firstname", "lastname", "phone","profile"])
        .populate("trainer", ["firstname", "lastname", "phone"])
        .populate("admin", ["firstname", "lastname", "phone"])
        .populate("diet.diet_id")
        .populate("trainee.profiles")
        

    res.send(diets);
});

router.post('/profile/trainee', [auth, admin], async (req, res) => {
  const profile = await Profile.findOne({ user: req.body.trainee_id })
  if (!profile) {
    return res.status(400).send({ message: 'Profile does not exist' })
  }
  res.send(profile)
})

// to get a single trainee diet request details in the admin panel
router.get("/traineeDiets/:id", [auth, admin], async(req, res) => {
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

// to assign a trainee diet request to a trainer in the admin panel
router.post("/traineeDiets", [auth, admin], async(req, res) => {
    const schema = Joi.object({
        trainer: Joi.objectId().required(),
        traineeDietId: Joi.objectId().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    const { trainer, traineeDietId } = req.body;

    try {
        const diet = await TraineeDiet.findByIdAndUpdate(
            traineeDietId, {
                admin: req.user.id,
                trainer: trainer,
            }, { new: true }
        );

        res.send(diet);
    } catch (ex) {
        for (const key in ex.errors) {
            res.status(404).send(ex.errors[key].message);
        }
    }
});

//export

module.exports = router;