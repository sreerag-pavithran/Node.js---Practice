const jwt = require('jsonwebtoken');
let secretJWT = "kjhsdhgksj65sd465s5d6+as6+d5s6+d5+as9d86a87";

module.exports = (req, res, next)=>{
    const token = req.header('auth-token');
    if(!token){
        return res.send('Access denied')
    }
    try {
        const verified  = jwt.verify(token, secretJWT)
        req.user = verified;
        next();
    } catch (err) {
        res.send('invalid Token')
    }
}