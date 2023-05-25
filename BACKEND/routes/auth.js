const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser")

const JWT_SECRET = "kartik1@2"
const router = express.Router();

// Route 1 : Create a USer using POST "/api/auth/createuser. No login required"
router.post("/createuser",[body("name","Enter a vaild email").isLength({min:3}),
body("email","Enter a vaild email").isEmail(),
body("password","Password must be ateast 5 characters").isLength({min:5})
],async (req,res)=>{
    //if there are errors, return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        //CHeck whether user with same email exits already
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({error:"Sorry a user with this email already exits"})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email:req.body.email,
          })
        const data ={
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        
        res.json({authtoken});
    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }
    
      
})

// Route 2 : Login a USer using POST "/api/auth/login. No login required"
router.post("/login",[
body("email","Enter a vaild email").isEmail(),
body("password","Password cannot be blank").exists(),

],async (req,res)=>{  
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try{
        let user =await User.findOne({email});
        if(!user){
            return res.status(400).json({error:"Please enter correct Credentials"})
        }
        const passcompare = await bcrypt.compare(password,user.password);
        if (!passcompare){
            return res.status(400).json({error:"Please enter correct Credentials"});

        }
        const data ={
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken});


    }catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server error");
    }
}
)

//Route 3 : Get logged in User details usong : POST  "/api/auth/getuser". login required.
router.post("/getuser",fetchuser,async (req,res)=>{  
        
try {
    userId= req.user.id;
const user = await User.findById(userId).select("-password")
res.send(user);
}catch(error){
    console.log(error.message);
    res.status(500).send("Internal Server error");
}
}
)
module.exports = router;
