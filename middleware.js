const jwt = require("jsonwebtoken");
const SECRET_KEY = "secret key";  

const authenticate = (req, res, next) => {  
     console.log("TOKEN "+req.user);
    next()
};

module.exports = authenticate;
