const express=require("express");
const router=express.Router();
const BookModel=require("../Models/book");


router.get("/",(req,res,next)=>{
    BookModel.
        find()
        .select("id title publisher author numberOfPages")
            .then((data)=>{
                const response=data.map((e)=>{
                    return {
                        id:e.id,
                        title:e.title,
                        author:e.author,
                        publisher:e.publisher,
                        numberOfPages:e.numberOfPages,
                        get:`${process.env.books}:${process.env.expressPORT}/api/book/${e.id}`
                    }
                })

                res.status(200).json({
                    message:"Book list",
                    length:data.length,
                    data:response
                })
            })
            .catch((e)=>{
                res.status(500).json({
                    error:e
                })
            })
});

router.get('/book/:id',(req,res,next)=>{
    BookModel.findById(req.params.id)
        .select("id title author publisher numberOfPages")
        .then((data)=>{
            res.status(200).json({
                message:"Book Result",
                data:data
            })
        })
        .catch((e)=>{
            res.status(500).json({
                message:"Couldnt find the book"
            })
        })
})



router.post("/book",(req,res,next)=>{
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