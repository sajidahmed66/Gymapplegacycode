const mongoose = require('mongoose')

const SellSchema = new mongoose.Schema({
    
    traineeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    date:{
        type:Date,
        required:true,
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    unitPrice:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true
    }

})

const Sell = mongoose.model('Sell',SellSchema)

module.exports=Sell