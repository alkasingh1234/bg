import express from 'express'
import bcrypt from 'bcrypt';
import usermodel from '../models/User.js';
import postmodel from '../models/Post.js';


const router = express.Router();
 

// update 
router.put('/:id',async(req,res)=>
{   
    //  in updation we can use username but as we can change our username so we can use the fixed one i.e userId
    try{
    if(req.params.id==req.body.userId)
    {
        const  salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password,salt);
   try{
        
    const updateuser = await usermodel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
    res.status(200).json(updateuser);

   }catch(err)
   {
     res.status(500).json("error while in updating!");
   }}
   else{
    res.status(500).json("you can only update your account!!");
   }}
   catch(err)
   {
    res.status(505).json("missing in body request");
   }
});

// delete


router.delete('/:id',async(req,res)=>
{
    try{

    if(req.params.id==req.body.userId)
    {
        const creator = await usermodel.findById(req.params.id);
        console.log(creator);
   try{

     await postmodel.deleteMany({username:creator.username});
     await usermodel.findByIdAndDelete(req.params.id);
     res.status(200).json("deleted successfully!");

   }catch(err)
   {
     res.status(500).json("getting error in deleting account");
   }}
   else{
    res.status(500).json("you can only delete your account!!");
   }}
   catch(err)
   {
    res.status(505).json("missing in body req");
   }
});

// get All id
router.get("/:id", async (req, res) => {
    try {
      const user = await usermodel.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//   get all
router.get('/',async (req, res) => {
    try {
      if(req.body.userId != '64a9c25aaabae5f4732d2f1b') res.status(500).json("didn't able to get all data!");
      const user = await usermodel.find();
    //   const { password, ...others } = user._doc;
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  });

export default router;