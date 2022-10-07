const User=require('../../models/User')
const UserProfile=require('../../models/User')
const bcrypt=require('bcrypt')
const Joi=require('joi')
const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth')
const admin = require('../../middleware/admin')
var unirest = require('unirest');

//Routes

router.get('/trainers',[auth,admin],async(req,res)=>{
    
    const trainers = await User.find({userRole:2}).sort({_id:-1}).select('-password')
    res.send(trainers)

})

router.get('/trainers/:id',[auth,admin],async(req,res)=>{
    
    const trainer = await User.findOne({userRole:2,id:req.params.id}).select('-password')
    if (!trainer) {
        res.status(400).send('Trainer does not exists')
    }
    res.send(trainer)

})


router.post('/trainers',async(req,res)=>{
    // Validation
    const schema=Joi.object({
        firstname:Joi.string().max(255).required(),
        lastname:Joi.string().max(255).required(),
        phone:Joi.number().min(11).required(),

    })

    const {error}=schema.validate(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const {firstname,lastname,phone}=req.body

    //Logic

    let trainer=await User.findOne({phone:phone})
    
    if (trainer) {
        return res.status(404).send('Phone Number Already Exists')
    }

    const salt=await bcrypt.genSalt(10)
    const passwordUnhashed = Math.random().toString(36).substr(2, 8);
    console.log(passwordUnhashed)
    const hashedPassword=await bcrypt.hash(passwordUnhashed,salt)

    trainee=new User({
        firstname:firstname,
        lastname:lastname,
        phone:phone,
        password:hashedPassword,
        userRole:2,
    })

    //SMS Gateway

    var username="01918184015"
    var password="FB72C69Z"
    var number=phone
    var message=`Hello ${firstname} ${lastname}, Your Login Number: ${phone} Password:${passwordUnhashed}`

    var req = unirest('POST', 'http://66.45.237.70/api.php?username='+username+'&password='+password+'&number='+number+'&message='+message)
        .headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        .send("")
        .end(function (res) { 
            if (res.error) throw new Error(res.error); 
            console.log(res.raw_body);
        });

    try {
        trainee = await trainee.save()
        
        const trainers = await User.find({userRole:2}).sort({_id:-1})

        res.send(trainers)

    } catch (ex) {
        for (const key in ex.errors) {
            return res.status(404).send(ex.errors[key].message)
        }
    }

    
})



//export

module.exports=router




