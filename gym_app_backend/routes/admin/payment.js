const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const Payment = require("../../models/Payment");
const Package = require("../../models/Package");
const User = require("../../models/User");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
var unirest = require('unirest');

router.get("/payments", [auth, admin], async(req, res) => {
    const payments = await Payment.find()
        .sort({ _id: -1 })
        .populate("trainee", ["firstname", "lastname"]);
    res.send(payments);
});

router.get("/payments/trainee/:id", [auth, admin], async(req, res) => {
    const payment = await Payment.find({ trainee: req.params.id })
        .sort({ _id: -1 })
        .populate("trainee", ["firstname", "lastname"]);
    if (!payment) {
        return res.status(400).send("Payment not found");
    }

    res.send(payment);
});

router.get("/payments/trainee/:id/last", [auth, admin], async(req, res) => {
    const payment = await Payment.findOne({ trainee: req.params.id })
        .sort({ _id: -1 })
        .populate("trainee", ["firstname", "lastname"]);
    if (!payment) {
        return res.status(400).send("Payment not found");
    }

    res.send(payment);
});

router.get('/payments/:id', [auth, admin], async (req, res) => {
  const payment = await Payment.findById(req.params.id )      
                               .populate('trainee', ['firstname', 'lastname'])
  if (!payment) {
    return res.status(400).send('Payment not found')
  }

  res.send(payment)
})

// router.post('/payments',[auth,admin],async(req,res)=>{
//     const schema=Joi.object({

//     res.send(payment);
// });

router.post("/payments", [auth, admin], async(req, res) => {
    const schema = Joi.object({
        trainee: Joi.objectId().required(),
        subscriptionType: Joi.number().required(),
        packageType: Joi.objectId(),
        totalAmount: Joi.number().required(),
        subscriptionAmount: Joi.number().required(),
        paidAmount: Joi.number().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    const {
        trainee,
        subscriptionType,
        packageType,
        totalAmount,
        subscriptionAmount,
        paidAmount,
    } = req.body;

    subscription = {};
    subscription["type"] = subscriptionType;
    subscription["packageType"] = packageType;

    installment = {};
    (installment["amount"] = paidAmount), (installment["date"] = new Date());

    const traineeFind = await User.findById(trainee);

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

    if (subscriptionType == 1) {
        var now = new Date();
        // var nextPaymentDate = traineeFind.nextPaymentDate.setMonth(now.getMonth() + 1, 10);
        var date=new Date(traineeFind.nextPaymentDate)
        var nextPaymentDate = new Date(date.setMonth(date.getMonth()+1))
        var due = totalAmount - paidAmount;
    } else if (subscriptionType == 2) {
        var due = totalAmount - paidAmount;
        const package = await Package.findById(packageType);
        var date=new Date(traineeFind.nextPaymentDate)
        // var nextPaymentDate = now.setDate(now.getDate() + package.time_duration);
        var nextPaymentDate = date.setDate(date.getDate() + package.time_duration)

    }

    let payment = new Payment({
        trainee: trainee,
        subscription: subscription,
        totalAmount: totalAmount,
        subscriptionAmount: subscriptionAmount,
        paidAmount: paidAmount,
        dueAmount: due,
        // installment:installment
    });
    try {
        payment.installment.push(installment);

        payment = await payment.save();

        // const traineeFind = await User.findById(trainee);
        traineeFind.subscription = subscription;
        traineeFind.currentPaymentDate = Date.now();
        traineeFind.nextPaymentDate = nextPaymentDate;
        const result = await traineeFind.save();
        console.log(result);

        res.send(payment);
    } catch (ex) {
        for (const key in ex.errors) {
            res.status(404).send(ex.errors[key].message);
        }
    }
});

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

module.exports = router;