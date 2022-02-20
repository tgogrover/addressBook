const mongoose=require('mongoose');

//defining the schema
var AddressBookSchema=new mongoose.Schema({
   
   
    Contacts:{
        type:Number,
       required:true,
        unique:true,
        minlength:10,
        maxlength:10
    },
    Address:{
        type:String,
        required:true
    },
    
    date:{
        type:Date,
        default:Date
    }
});


//exporting addressBook model
module.exports=mongoose.model('AddressBook',AddressBookSchema)