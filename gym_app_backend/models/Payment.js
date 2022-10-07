const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    
    trainee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    paymentDate:{
        type:Date,
        required:true,
        default:Date.now
    },
    subscription:{
        type:{
            type:Number,
            required:true
        },
        packageType:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Package',
        },
    },
    totalAmount:{
        type:Number,
        required:true
    },
    registrationAmount:{
        type:Number,
    },
    subscriptionAmount:{
        type:Number,
        required:true
    },
    paidAmount:{
        type:Number,
        required:true
    },
    dueAmount:{
        type:Number,
        required:true
    },
    installment:[{
        amount:{
            type:Number,
            required:true
        },
        date:{
            type:Date,
            required:true,
            default:Date.now
        },
    }]


})

const Payment = mongoose.model('Payment',PaymentSchema)

module.exports=Payment