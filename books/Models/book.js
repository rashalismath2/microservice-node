const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const bookSchema=new Schema({
    title:{
        type:String,required:true
    }
    ,author:{
        type:String,required:true
    },
    numberOfPages:{
        type:Number,required:false
    },
    publisher:{
        type:String,required:true
    }
})

const bookModel=mongoose.model("Book",bookSchema);

module.exports=bookModel;