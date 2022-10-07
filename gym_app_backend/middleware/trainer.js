const config=require('config')
const jwt=require('jsonwebtoken')


function trainer(req,res,next){
     
    if (req.user.userRole !==2 ) {
        return res.status(403).send('Trainer Access Denied')
    }

    next()

}

module.exports=trainer