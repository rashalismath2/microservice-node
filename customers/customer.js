const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const dotenv=require("dotenv");
const morgan=require("morgan");
const connectMongo=require("./DB/db");
const cors=require("./Middlewares/cors");


dotenv.config();
const app=express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Middlewares
cors(app);

//Routes
const route=require("./Routes/route");
app.use("/api",route);


//Erorrs
app.use((req,res,next)=>{
        const error=new Error("Route not found");
        error.status=404;
        next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    .json({
        error:{
            message:error.message
        }
    });
});

function connectExpressServer(){
    app.listen(process.env.expressCustomerPORT,()=>{
        console.log("customer server has started on "+process.env.expressCustomerPORT);
    });
}

connectMongo(connectExpressServer);
