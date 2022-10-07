const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const User = require("../../models/User");
const Profile = require("../../models/UserProfile");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/profileImage");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
});

//Routes

// to get the profile info in the admin panel
router.get("/profile/me", [auth, admin], async(req, res) => {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
        "user", ["firstname", "lastname", "phone"]
    );
    if (!profile) {
        return res.status(400).send({ message: "Profile does not exist" });
    }
    res.send(profile);
});

// to update the profile info in the admin panel
router.post(
    "/profile", [auth, admin, upload.single("image")],
    async(req, res) => {
        const schema = Joi.object({
            // user:Joi.objectId().required(),
            email: Joi.string().min(5).max(255).email(),
            address: Joi.string(),
            dateOfBirth: Joi.date(),
            gender: Joi.string().max(255),
            image: Joi.string(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const { email, address, dateOfBirth, gender } = req.body;

        try {
            let profile = await Profile.findOne({ user: req.user.id });

            if (profile) {
                //Update
                if (req.file !== undefined) {
                    profile = await Profile.findOneAndUpdate({ user: req.user.id }, {
                        user: req.user.id,
                        email: email,
                        address: address,
                        dateOfBirth: dateOfBirth,
                        gender: gender,
                        image: req.file.path,
                    }, { new: true });
                } else {
                    profile = await Profile.findOneAndUpdate({ user: req.user.id }, {
                        user: req.user.id,
                        email: email,
                        address: address,
                        dateOfBirth: dateOfBirth,
                        gender: gender,
                    }, { new: true });
                }

                return res.send(profile);
            }

            //Add
            if (req.file !== undefined) {
                profile = new Profile({
                    user: req.user.id,
                    email: email,
                    address: address,
                    dateOfBirth: dateOfBirth,
                    gender: gender,
                    image: req.file.path,
                });
            } else {
                profile = new Profile({
                    user: req.user.id,
                    email: email,
                    address: address,
                    dateOfBirth: dateOfBirth,
                    gender: gender,
                });
            }

            profile = await profile.save();
            res.send(profile);
        } catch (ex) {
            for (const key in ex.errors) {
                res.status(404).send(ex.errors[key].message);
            }
        }
    }
);

//export

module.exports = router;