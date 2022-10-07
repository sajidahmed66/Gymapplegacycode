const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const trainer = require("../../middleware/trainer");
const User = require("../../models/User");
const TraineeDiet = require("../../models/TraineeDiet");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/dietFile");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    // Allowed ext
    const filetypes = /pdf|doc|xlsx|xls|csv/;

    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Please Select Pdf, Document, Excel file!');
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter
});

// get all trainee diet request list in the trainer panel
router.get("/traineeDiets", [auth, trainer], async (req, res) => {
    const diets = await TraineeDiet.find({ trainer: req.user.id })
        .sort({ _id: -1 })
        .populate("trainee", ["firstname", "lastname", "phone"])
        // .polulate('profile')
        .populate("trainer", ["firstname", "lastname", "phone"])
        .populate("admin", ["firstname", "lastname", "phone"])
        .populate("diet.diet_id");

    res.send(diets);
});

// get single trainee diet request details in the trainer panel
router.get("/traineeDiets/:id", [auth, trainer], async (req, res) => {
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

// assign diet chart to a trainee in the trainer panel
router.post(
    "/traineeDiets", [auth, trainer, upload.single("file")],
    async (req, res) => {
        // console.log("diet req", req.body.flag)
        if (req.body.flag == 1) {
            //    return res.send('Manual Input')
            const schema = Joi.object({
                fromDate: Joi.date().required(),
                toDate: Joi.date().required(),
                traineeDietId: Joi.objectId().required(),
                diet_id: Joi.array().min(1).items(Joi.objectId()).required(),
                quantity: Joi.array().min(1).items(Joi.number()).required(),
                totalCalorie: Joi.array().min(1).items(Joi.number()).required(),
                flag: Joi.number().required(),
            });

            const { error } = schema.validate(req.body);

            if (error) {
                return res.status(400).send(error.details);
            }

            const {
                fromDate,
                toDate,
                traineeDietId,
                diet_id,
                quantity,
                totalCalorie,
                flag,
            } = req.body;

            try {
                const diet = await TraineeDiet.findByIdAndUpdate(
                    traineeDietId, {
                    fromDate: fromDate,
                    toDate: toDate,
                    approval: 1,
                    flag: flag,
                    approvedDate: Date.now(),
                }, { new: true }
                );

                for (let i = 0; i < diet_id.length; i++) {
                    object = {};
                    object["diet_id"] = diet_id[i];
                    object["quantity"] = quantity[i];
                    object["totalCalorie"] = totalCalorie[i];

                    diet.diet.push(object);
                }

                diet.save();
                return res.send(diet);
            } catch (ex) {
                for (const key in ex.errors) {
                    res.status(404).send(ex.errors[key].message);
                }
            }
        } else if (req.body.flag == 2) {
            console.log("flag2 check", req)
            //    return res.send('File Upload')
            const schema = Joi.object({
                fromDate: Joi.date().required(),
                toDate: Joi.date().required(),
                traineeDietId: Joi.objectId().required(),
                flag: Joi.number().required(),
            });

            const { error } = schema.validate(req.body);

            if (error) {
                return res.status(400).send(error.details[0].message);
            }

            const { fromDate, toDate, traineeDietId, flag } = req.body;

            try {
                const diet = await TraineeDiet.findByIdAndUpdate(
                    traineeDietId, {
                    fromDate: fromDate,
                    toDate: toDate,
                    approval: 1,
                    flag: flag,
                    approvedDate: Date.now(),
                    file: req.file.path,
                }, { new: true }
                );

                return res.send(diet);
            } catch (ex) {
                for (const key in ex.errors) {
                    res.status(404).send(ex.errors[key].message);
                }
            }
        }
    }
);

// to update a trainee diet in the trainer panel
router.put(
    "/traineeDiets/:id", [auth, trainer, upload.single("file")],
    async (req, res) => {
        if (req.body.flag == 1) {
            const schema = Joi.object({
                fromDate: Joi.date().required(),
                toDate: Joi.date().required(),
                diet_id: Joi.array().min(1).items(Joi.objectId()).required(),
                quantity: Joi.array().min(1).items(Joi.number()).required(),
                totalCalorie: Joi.array().min(1).items(Joi.number()).required(),
                flag: Joi.number().required(),
            });

            const { error } = schema.validate(req.body);

            if (error) {
                return res.status(400).send(error.details);
            }

            const { fromDate, toDate, diet_id, quantity, totalCalorie, flag } =
                req.body;

            try {
                const diet = await TraineeDiet.findByIdAndUpdate(
                    req.params.id, {
                    fromDate: fromDate,
                    toDate: toDate,
                    flag: flag,
                }, { new: true }
                );

                diet.diet = [];

                for (let i = 0; i < diet_id.length; i++) {
                    object = {};
                    object["diet_id"] = diet_id[i];
                    object["quantity"] = quantity[i];
                    object["totalCalorie"] = totalCalorie[i];

                    diet.diet.push(object);
                }

                diet.save();
                return res.send(diet);
            } catch (error) {
                for (const key in ex.errors) {
                    res.status(404).send(ex.errors[key].message);
                }
            }
        } else if (req.body.flag == 2) {
            const schema = Joi.object({
                fromDate: Joi.date().required(),
                toDate: Joi.date().required(),
                flag: Joi.number().required(),
                file: Joi.required(),
            });

            const { error } = schema.validate(req.body);

            if (error) {
                return res.status(400).send(error.details);
            }

            const { fromDate, toDate, flag } = req.body;

            try {
                const diet = await TraineeDiet.findByIdAndUpdate(
                    req.params.id, {
                    fromDate: fromDate,
                    toDate: toDate,
                    flag: flag,
                    file: req.file.path,
                }, { new: true }
                );

                return res.send(diet);
            } catch (error) {
                for (const key in ex.errors) {
                    res.status(404).send(ex.errors[key].message);
                }
            }
        }
    }
);

//export

module.exports = router;