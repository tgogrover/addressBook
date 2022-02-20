const mongoose=require('mongoose');

//defining the schema
var SignupSchema=new mongoose.Schema({
   
    Password:{
        type:String,
        required:true,
        minlength:6
    },
    Contacts:{
        type:Number,
       required:true,
        unique:true,
        minlength:10,
        maxlength:10
    },
    
    date:{
        type:Date,
        default:Date
    }
});


//exporting sigup model
module.exports=mongoose.model('Contact',SignupSchema)