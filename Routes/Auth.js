import express from "express";
import usermodel from '../models/User.js'
import bcrypt from 'bcrypt'


export const router = express.Router();
//  login 

router.post('/login',async(req,res)=>
{   try{
    const user  = await usermodel.findOne({username:req.body.username});
    if(!user) {res.status(500).json(" wrong credentials!!"); }
    else{
     const validpassword = await bcrypt.compare(req.body.password,user.password)
    if(!validpassword) { res.status(500).json("password is wrong")}
    else{const {password,...others} = user._doc;
         res.status(200).json(others);}
   }}
   catch(err)
   {
    res.status(400).json("Error in login!");
   }
});

// register


router.post('/register',async(req,res)=>
{   try{
    const Salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,Salt);
    const newuser = new usermodel(
        {
            username: req.body.username,
            password: hashPassword,
            email: req.body.email,
        }
    );
    const customer =await newuser.save();  
    res.status(200).json(customer);
   }
   catch(err)
   {
    res.status(400).json("Error in login!");
   }
});

