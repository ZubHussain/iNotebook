const router = require('express').Router()
const User = require('../Models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');``
const jwt = require('jsonwebtoken');
const fetchuser=require('../Middleware/fetchuser')

const JWT_SECRET = 'zubairisagoodboy'

// ==================================================Signup===========================================================================
router.post('/createuser',[
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),

],async (req,res)=>{
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
    let user= await User.findOne({email:req.body.email});
    if(user){
      return res.status(400).json({success, message: "Email already exists" });
    }

    const salt = await bcrypt.genSaltSync(10);
    const secPass=await bcrypt.hashSync(req.body.password, salt);

    user=await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })

      const data={
        user:{
          id: user.id
        }
      }

      const authToken = jwt.sign(data, JWT_SECRET);
      success=true
      res.json({success,authToken})
      // res.json(user)

    } catch (error) {
      console.log(error.message)
      res.status(500).send("Internal Server Occured")
    }
})

//====================================================Login========================================================================= 

router.post('/login',[
  body('email').isEmail(),
  body('password').exists()

],async (req,res)=>{
  let success=false
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
      success=false
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const comparePassword = await bcrypt.compare(password,user.password)
    if(!comparePassword){
      success=false
      return res.status(400).json({success, message: "Invalid email or password" });
      }

      const data={
        user:{
          id:user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true
      res.json({success,authToken})

  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server Occured")
  }

})

//===================================================FetchUser===========================================================

router.post('/fetchuser',fetchuser,async (req,res)=>{
  
  try {
    const userId=req.user.id
    const user=await User.findById(userId).select('-password');
    res.send(user)

  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server Occured")
  }
})





module.exports = router;