require('dotenv').config();
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) =>{

    const token = req.headers.authorization.split(" ")[1];
   
    try{
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        req.userData = decoded
        next();
    }
    catch(error){
        res.status(401).json({
            message: 'Auth failed' + error
        })

    }

}