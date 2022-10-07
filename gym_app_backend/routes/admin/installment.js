const express = require("express");
const router = express.Router();
const auth = require('../../middleware/auth')
const admin = require('../../middleware/admin')
const Payment = require('../../models/Payment')
const Package = require('../../models/Package')
const User = require('../../models/User')
const Joi=require('joi');
Joi.objectId = require('joi-objectid')(Joi)
var unirest = require('unirest');



// router.get('/installments',[auth,admin],async(req,res)=>{

//     const payments= await Payment.find().populate('trainee',['firstname','lastname'])
//     res.send(payments)

// })

// router.get('/payments/:id',[auth,admin], async(req,res)=>{
     
//         const payment = await Payment.findById(req.params.id).populate('trainee',['firstname','lastname'])
//         if (!payment) {
//             return res.status(400).send('Payment not found')
//         }

//         res.send(payment)

// })


router.post('/installments',[auth,admin],async(req,res)=>{
    
    const schema=Joi.object({
        paymentId:Joi.objectId().required(),
        paidAmount:Joi.number().required()
    })

    const {error}=schema.validate(req.body)

    if (error) {
        return res.status(400).send(error.details)
    }

    const { paymentId,paidAmount } = req.body

    installment={}
    installment['amount']=paidAmount,
    installment['date']=new Date()

    let payment=await Payment.findById(paymentId)
    
    payment.paidAmount=parseInt(payment.paidAmount)+parseInt(paidAmount)
    payment.dueAmount=parseInt(payment.dueAmount)-parseInt(paidAmount)
    payment.paymentDate=new Date()

    const traineeFind = await User.findById(payment.trainee);
    traineeFind.currentPaymentDate = Date.now();
    await traineeFind.save();
    
    
    //SMS Gateway
    var username="01918184015"
    var password="FB72C69Z"
    var number=traineeFind.phone
    var message=`Hello ${traineeFind.firstname} ${traineeFind.lastname},We have received your payment of ${paidAmount} Tk.`

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
        payment.installment.push(installment)
        payment = await payment.save()
        res.send(payment)
    } catch (ex) {
        for (const key in ex.errors) {
            res.status(404).send(ex.errors[key].message)
        }
    }

    
})

// router.put('/diets/:id',[auth,admin],async (req,res)=>{
//     const schema=Joi.object({
//         name:Joi.string().max(255).required(),
//         quantity:Joi.number().required(),
//         unit:Joi.string().max(255),
//         calorie:Joi.string().required(),
//     })

//     const {error}=schema.validate(req.body)

//     if (error) {
//         return res.status(400).send(error.details)
//     }

//     const { name, quantity,unit,calorie } = req.body

//     const diet = await Diet.findByIdAndUpdate(req.params.id,{
//         name:name,
//         quantity:quantity,
//         unit:unit,
//         calorie:calorie,
//         entryBy:req.user.id
//     },{new:true})

//     if (!diet) {
//         return res.status(400).send('Diet does not exist')
//     }

//     res.send(diet)
// })

// router.delete('/diets/:id',[auth,admin],async (req,res)=>{
    
//     const diet= await Diet.findByIdAndRemove(req.params.id)
//     if (!diet) {
//         return res.status(404).send('Diet not found')
//     }

//     res.send(diet)

//  })
 




//export

module.exports = router