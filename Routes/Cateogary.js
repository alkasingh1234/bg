import Categoary from "../models/Categoary.js";
import express from 'express';

const router = express.Router();

router.post('/',async(req,res)=>
{    const newCat = new Categoary(req.body);
   try{
     const nc = await newCat.save();
     res.status(200).json(nc);
   
   }catch(err)
   {
     
    res.status(500).json("error while in cateogary");
   }

})



router.get("/", async (req, res) => {
    try {
      const cats = await Categoary.find();
      res.status(200).json(cats);
    } catch (err) {
      res.status(500).json(err);
    }
  });


export default router;