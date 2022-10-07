const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth')
const trainer = require('../../middleware/trainer')
const TrainerPayment = require('../../models/TrainerPayment')
const Joi=require('joi');
Joi.objectId = require('joi-objectid')(Joi)



router.get('/trainerPayments/me',[auth,trainer],async(req,res)=>{

    const payments= await TrainerPayment.find({trainer:req.user.id}).sort({_id:-1}).populate('trainer',['firstname','lastname'])
    res.send(payments)

})

router.get('/trainerPayments/:id',[auth,trainer], async(req,res)=>{
     
        const payment = await TrainerPayment.findById(req.params.id).populate('trainer',['firstname','lastname'])
        if (!payment) {
            return res.status(400).send('Payment not found')
        }

        res.send(payment)

})







//export

module.exports = router