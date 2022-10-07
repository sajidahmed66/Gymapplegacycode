const mongoose=require('mongoose')

const PackageSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        max:255
    },
    amount:{
        type:Number,
        required:true,
        min:0                
    },
    time_duration:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        required:true,
        default:Date.now
    },
    entryBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

})


const Package= mongoose.model('Package',PackageSchema)

module.exports=Package
