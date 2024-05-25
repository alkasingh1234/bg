import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import {router} from './Routes/Auth.js'
import userRoute from './Routes/User.js'
import postRoute from './Routes/Post.js'
import multer from "multer";
import catRoute from './Routes/Cateogary.js';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';



dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/images', express.static(__dirname + '/images'));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

// mongodb connection 

mongoose.connect(process.env.mongo_url).then(()=>{console.log("mongodb connected !")}).catch((err)=>{console.log(err);});
// multer

const storage = multer.diskStorage({  
   destination:(req,file,cb)=>
   {
      cb(null,"images");
   },
   filename:(req,file,cb)=>
   {
     cb(null,req.body.name);
   }
}
);

const upload = multer({storage:storage});

// routes 

app.use('/api/upload',upload.single('file'),(req,res)=>{ res.status(200).json("successfully uploaded")});
app.use('/api/auth',router);
app.use('/api/user',userRoute);
app.use('/api/post',postRoute);
app.use('/api/cat',catRoute);

app.listen('5000',()=>
{    
    const port = 'http//:localhost:5000';
    console.log(`server is listen on ${port}`);
})


