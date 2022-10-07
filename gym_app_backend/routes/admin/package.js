const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth')
const admin = require('../../middleware/admin')
const User = require('../../models/User')
const Package = require('../../models/Package')
const Joi=require('joi');
Joi.objectId = require('joi-objectid')(Joi)



router.get('/packages',[auth,admin],async(req,res)=>{

    const packages= await Package.find().sort({_id:-1}).populate('entryBy',['firstname','lastname'])
    res.send(packages)

})

router.get('/packages/:id',[auth,admin], async(req,res)=>{
     
        const package = await Package.findById(req.params.id)
        if (!package) {
            return res.status(400).send('Package not found')
        }
        res.send(package)

})


router.post('/packages',[auth,admin],async(req,res)=>{
    const schema=Joi.object({
        name:Joi.string().max(255).required(),
        amount:Joi.number().min(0).required(),
        time_duration:Joi.number().required()
       
    })

    const {error}=schema.validate(req.body)

    if (error) {
        return res.status(400).send(error.details)
    }

    const { name, amount,time_duration } = req.body

    let package = new Package({
        name:name,
        amount:amount,
        time_duration:time_duration,
        entryBy:req.user.id
    }) 

    try {
        package=await package.save()
        res.send(package)
    } catch (ex) {
        for (const key in ex.errors) {
            res.status(404).send(ex.errors[key].message)
        }
    }

    
})

router.put('/packages/:id',[auth,admin],async (req,res)=>{
    const schema=Joi.object({
        name:Joi.string().max(255).required(),
        amount:Joi.number().min(0).required(),
        time_duration:Joi.number().required()

    })

    const {error}=schema.validate(req.body)

    if (error) {
        return res.status(400).send(error.details)
    }

    const { name, amount,time_duration } = req.body

    const package = await Package.findByIdAndUpdate(req.params.id,{
        name:name,
        amount:amount,
        time_duration:time_duration,
    },{new:true})

    if (!package) {
        return res.status(400).send('Package does not exist')
    }

    res.send(package)
})

router.delete('/packages/:id',[auth,admin],async (req,res)=>{
    
    const package= await Package.findByIdAndRemove(req.params.id)
    if (!package) {
        return res.status(404).send('Package not found ')
    }
    res.send(package)

 })
 




//export

module.exports = router