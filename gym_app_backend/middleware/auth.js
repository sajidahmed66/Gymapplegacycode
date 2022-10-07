const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    // console.log(req.header("x-auth-token"));

    const token = req.header("x-auth-token");
}
function auth(req,res,next){
     
    const token=req.header('x-auth-token')
    // console.log(token);
    if (!token) {
        return res.status(401).send("Access Denied.No Token Provided");
    }

    try {
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(400).send("Invalid Token");
    }
}

module.exports = auth