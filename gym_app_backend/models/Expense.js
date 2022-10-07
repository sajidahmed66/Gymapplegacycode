const mongoose=require('mongoose')

const ExpenseSchema=new mongoose.Schema({
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
    date:{
        type:Date,
        required:true
    },
    entryBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

})


const Expense= mongoose.model('Expense',ExpenseSchema)

module.exports=Expense
