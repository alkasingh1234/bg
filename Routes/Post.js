import express from 'express'
import usermodel from '../models/User.js';
import postmodel from '../models/Post.js';


const router = express.Router();
 
//post
 
router.post('/',async(req,res)=>
{   const newpost =  new postmodel(req.body);
    console.log(req.body);
   try{
      const savepost = await newpost.save();
      res.status(200).json(savepost);
   }
   catch(err)
   {
    res.status(500).json("post is not created!");
   }
});

// update 
router.put('/:id',async(req,res)=>
{   
    // id we can find that post and then find the username and if it matched then it is allowed otherwise not allowed
    try{
    const  postdata = await postmodel.findById(req.params.id);
    if(postdata.username==req.body.username)
    {
        try{
            const updatepost  = await postmodel.findByIdAndUpdate(
                req.params.id,
                {
                    $set:req.body
                },
                {new:true}
            );
           
            res.status(200).json(updatepost);
        }catch(err)
        {
            res.status(500).json(err);
        }

    }
    else{
         
        res.status(505).json("you are not allowed to upadate!");
    }}
    catch(err)
    {
        res.status(505).json("getting error in updating");
    }

});

// delete


router.delete('/:id',async(req,res)=>
{
    try{
    const deletepost = await postmodel.findById(req.params.id);
    if(deletepost.username==req.body.username)
    {
       try
       {
        //   await deletepost.delete();
          await postmodel.findByIdAndDelete(req.params.id);
          res.status(200).json("successfully delted the post!");
       }
       catch(err){
        res.status(500).json("not able to delete your own post");
       }
    }
    else{
        res.status(505).json("you are not allowed to delete");
    }}
    catch(err)
    {
        res.status(505).json("getting error");
    }
});

//get

// router.get('/',async(req,res)=>
// {
//     //  find all the post 
//    const owner = req.query.username;
//    const category = req.query.category;
//    let allpost;
//    try{
    
//     if(owner)
//     {
//         allpost = await postmodel.find({username:owner});
//     }
//     else if(category)
//     {
//         allpost = await postmodel.find({categories:{
//             $in :[category],
//         },})
//     }
//     else {allpost = await postmodel.find();}

//     res.status(200).json(allpost);
      
//    }catch(err)
//    {
//        res.status(505).json(err);
//    }
// });

router.get("/", async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let posts;
      if (username) {
        posts = await postmodel.find({ username });
      } else if (catName) {
        posts = await postmodel.find({
          categories: {
            $in: [catName],
          },
        });
      } else {
        posts = await postmodel.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  });



  //GET POST
router.get("/:id", async (req, res) => {
    try {
      const post = await postmodel.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

export default router;