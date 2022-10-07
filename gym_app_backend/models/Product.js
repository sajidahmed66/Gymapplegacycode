const mongoose=require('mongoose')


const ProductSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    unit:{
        type:String,
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        default:0
    },
    image:{
        type:String,
    }
    

},{
    timestamps:true
})


const Product= mongoose.model('Product',ProductSchema)

module.exports=Product
