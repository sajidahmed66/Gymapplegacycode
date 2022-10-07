const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        max:255
    },
    lastname:{
        type:String,
        required:true,
        max:255
    },
    phone:{
        type:String,
        required:true,
        trim:true,
        min:11,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    userRole:{
        type:Number,
        required:true                
    },
    entryDate:{
        type:Date,
        default:Date.now
    },
    currentPaymentDate:{
        type:Date,
        default:Date.now
    },
    nextPaymentDate:{
        type:Date,
    },
    subscription:{
        type:{
            type:Number,
        },
        packageType:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Package',
        },
    },

})


const User= mongoose.model('User',UserSchema)

module.exports=User
