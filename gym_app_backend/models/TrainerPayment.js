const mongoose = require('mongoose')

const TrainerPaymentSchema = new mongoose.Schema({
    
    trainer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    date:{
        type:Date,
        required:true,
    },
    amount:{
        type:Number,
        required:true
    }


})

const TrainerPayment = mongoose.model('TrainerPayment',TrainerPaymentSchema)

module.exports=TrainerPayment