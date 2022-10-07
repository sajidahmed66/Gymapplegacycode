const config=require('config')
const jwt=require('jsonwebtoken')


function trainee(req,res,next){
     
    if (req.user.userRole !==3 ) {
        return res.status(403).send('Trainee Access Denied')
    }

    next()

}

module.exports=trainee