const mongoose = require('mongoose')

const DietRequestLimitSchema = new mongoose.Schema({
    noOfDays:{
        type:Number,
        required:true
    }
})

const DietRequestLimit = mongoose.model('DietRequestLimit',DietRequestLimitSchema)

module.exports=DietRequestLimit