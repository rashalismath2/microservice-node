const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();

mongoose.connect("mongodb+srv://ismath:"+process.env.mongodbpw+"@cluster0-vwh2t.mongodb.net/test?retryWrites=true&w=majority",
                    {useNewUrlParser:true, useUnifiedTopology: true });

function mongooseConnection(onconnect){
    mongoose.connection.once("open",()=>{
        onconnect();
        console.log("Connection to mongo db has been established");
    })
    .on("error",(e)=>{
        console.error("Cant connect to mongod db "+e);
    });
}
module.exports=mongooseConnection;