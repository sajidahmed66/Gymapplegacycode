const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth')
const trainer = require('../../middleware/trainer')
const User = require('../../models/User')
const Profile = require('../../models/UserProfile')
const Joi=require('joi')
Joi.objectId = require('joi-objectid')(Joi)

//Routes


router.post('/profile/trainee', [auth, trainer], async (req, res) => {
    const profile = await Profile.findOne({user:req.body.traineeId}).populate('user',['firstname','lastname','phone'])
    if (!profile) {
        return res.status(400).send({message:'Profile does not exist'})
    }
    res.send(profile)

})





//export

module.exports = router