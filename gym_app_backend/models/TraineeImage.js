const mongoose = require('mongoose')

const TraineeImageSchema = new mongoose.Schema({
    
    trainee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    image:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
        required:true
    },


})

const TraineeImage = mongoose.model('TraineeImage',TraineeImageSchema)

module.exports=TraineeImage