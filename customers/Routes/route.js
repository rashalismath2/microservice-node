const express=require("express");
const router=express.Router();
const CustomerModel=require("../Models/customer");


router.get("/",(req,res,next)=>{
    CustomerModel
        .find()
        .select("name age address email")
            .then((data)=>{
                const response=data.map((e)=>{
                    return {
                        id:e.id,
                        name:e.name,
                        email:e.email,
                        address:e.address,
                        age:e.age,
                        get:`${process.env.customers}/api/customer/${e.id}`
                    }
                })

                res.status(200).json({
                    message:"Customer list",
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

router.get('/customer/:id',(req,res,next)=>{
    CustomerModel
        .findById(req.params.id)
        .select("id name email age address")
        .then((data)=>{
            res.status(200).json({
                message:"Customer Result",
                data:data
            })
        })
        .catch((e)=>{
            res.status(500).json({
                message:"Couldnt find the Customer"
            })
        })
})



router.post("/customer",(req,res,next)=>{
    const customer=new CustomerModel({
        name:req.body.name,
        email:req.body.email,
        address:req.body.address,
        age:req.body.age
    });

    customer
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