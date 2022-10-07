const mongoose=require('mongoose')

const ProfileSchema=new mongoose.Schema({
    
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    email:{
        type:String,
        minlength:5,
        maxlength:255,
    },
    address:{
        type:String
    },
    dateOfBirth:{
        type:String
    },
    gender:{
        type:String
    },
    image:{
        type:String
    },
    age:{
        type:Number
    },
    weight:{
        type:Number
    },
    height:{
        type:Number
    },
    bmi:{
        type:Number
    },
    nid:{
        type:Number
    },
    nidImages:[{
        imageUrl:String,
        date:{
            type:Date,
            default:Date.now
        }

    }],
    date:{
        type:Date,
        default:Date.now
    }

})


const Profile= mongoose.model('Profile',ProfileSchema)

module.exports=Profile
