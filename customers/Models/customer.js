const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const customerSchema=new Schema({
    name:{
        type:String,required:true
    }
    ,age:{
        type:Number,required:true
    },
    address:{
        type:String,required:false
    },
    email:{
        type:String,required:true
    }
})

const customerModel=mongoose.model("Customer",customerSchema);

module.exports=customerModel;