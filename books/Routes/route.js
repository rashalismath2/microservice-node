const express=require("express");
const router=express.Router();
const BookModel=require("../Models/book");


router.get("/",(req,res,next)=>{
    BookModel.
        find()
        .select("id title publisher author numberOfPages")
            .then((data)=>{
                res.status(200).json({
                    data:data
                });
            })
            .catch((e)=>{
                res.status(500).json({
                    error:e
                })
            })
});

router.post("/",(req,res,next)=>{
    const Book=new BookModel({
        title:req.body.title,
        author:req.body.author,
        publisher:req.body.publisher,
        numberOfPages:req.body.numberOfPages
    });

    Book
    .save()
        .then((respond)=>{
            res.status(200).json({
                message:respond
            })
        })
        .catch((e)=>{
            res.status(500).json({
                error:e
            });
        })
});




module.exports=router;