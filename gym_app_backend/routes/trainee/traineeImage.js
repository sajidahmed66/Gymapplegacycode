const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const trainee = require("../../middleware/trainee");
const TraineeImage = require("../../models/TraineeImage");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/traineeImage");
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

router.get("/traineeImages/me", [auth, trainee], async(req, res) => {
    const images = await TraineeImage.find({ trainee: req.user.id }).sort({
        _id: -1,
    });

    res.send(images);
});

// router.get('/traineeImages/:id',[auth,trainee], async(req,res)=>{

//         const category = await Category.findById(req.params.id)
//         if (!category) {
//             return res.status(400).send('Category not found')
//         }

//         res.send(category)

// })

router.post(
    "/traineeImages", [auth, trainee, upload.array("image", 12)],
    async(req, res) => {
        // console.log(req);

        for (let i = 0; i < req.files.length; i++) {
            let image = new TraineeImage({
                trainee: req.user.id,
                image: req.files[i].path,
            });

            image = await image.save();
        }

        const images = await TraineeImage.find({ trainee: req.user.id }).sort({
            _id: -1,
        });

        res.send(images);

        // try {

        //     res.send(image)
        // } catch (ex) {
        //     for (const key in ex.errors) {
        //         res.status(404).send(ex.errors[key].message)
        //     }
        // }
    }
);

// router.put('/traineeImages/:id',[auth,trainee,upload.single('image')],async (req,res)=>{
//     const schema=Joi.object({
//         name:Joi.string().required(),
//     })

//     const {error}=schema.validate(req.body)

//     if (error) {
//         return res.status(400).send(error.details)
//     }

//     const { name} = req.body

//     const category = await Category.findByIdAndUpdate(req.params.id,{
//         name:name,
//         image:req.file.path
//     },{new:true})

//     if (!category) {
//         return res.status(400).send('Category does not exist')
//     }

//     res.send(category)
// })

router.delete("/traineeImages/:id", [auth, trainee], async(req, res) => {
    const image = await TraineeImage.findByIdAndRemove(req.params.id);

    if (!image) {
        return res.status(404).send("Image not found ");
    }

    fs.unlinkSync(image.image);

    res.send("Image Deleted");
});

//export

module.exports = router;