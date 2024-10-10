const jwt = require("jsonwebtoken");
const JWT_SECRET = "zubairisagoodboy";

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error:"Please authenticate using correct token"});
    }
    
    try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Please authenticate using correct token");
  }
};

module.exports = fetchuser;
