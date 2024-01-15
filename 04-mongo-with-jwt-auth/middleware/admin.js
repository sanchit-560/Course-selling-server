// Middleware for handling auth
const jwt = require("jsonwebtoken");
const {JWT_Secret} = require("../Key");
function adminMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken,JWT_Secret)
    console.log(decodedValue);
    if(decodedValue.username){
        next();
    }
    else{
        res.status(403).json({
            msg:"Authentication error!!!"
        })
    }

}

module.exports = adminMiddleware;