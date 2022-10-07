const mongoose = require('mongoose')

const ExerciseRequestLimitSchema = new mongoose.Schema({
    noOfDays:{
        type:Number,
        required:true
    }
})

const ExerciseRequestLimit = mongoose.model('ExerciseRequestLimit',ExerciseRequestLimitSchema)

module.exports=ExerciseRequestLimit