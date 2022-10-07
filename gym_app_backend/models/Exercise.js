const { date } = require('joi')
const mongoose = require('mongoose')

const ExerciseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required: false,
    },
    entryBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    date:{
        type:Date,
        default:Date.now
    }
})


const Exercise = mongoose.model('Exercise',ExerciseSchema)

module.exports=Exercise

