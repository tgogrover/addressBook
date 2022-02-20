const express=require('express');
const router=express.Router();
const signupModel=require('../models/signupModel')
const bcrypt=require('bcrypt');
const  {body,validationResult}=require('express-validator');

//wrong validation signup messages
const signIN_validationMessages=[
     body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 character long')
    .isString()
    .withMessage('Password must be string'),
     body('contacts')
    .notEmpty()
    .withMessage(' contacts  is required')
    .isLength({ min: 10,max:10})
    .withMessage('Contacts must be valid indian mobile number'), 
]



//giving validation messages as response if there is wrong validation
const Validation=  (req,res,next)=> {const errors = validationResult(req);
if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(400).json({ error: errors.array()[0].msg })
}
next();
}




//checking if passed contacts in database or not if,found then give message="Try differnt username" as response
const uniqueContacts = async (req,res,next) => {
    const {contacts}=req.body;
    const contactsFindQuery=signupModel.findOne({Contacts:contacts})
    await contactsFindQuery.exec((err,data)=>{
        if(err) throw err
    if(data){
        console.log(data)
       return  res.status(400).json({
           Message:"Try differnt contacts"
       });
        
    }
    else{
        next();
    }
    }) 
};




// signup here
router.post('/api/signup',signIN_validationMessages,Validation,uniqueContacts,async(req,res)=>{
    
    const {password,contacts}=req.body;
     console.log(req.body)
    const Hash_Password=bcrypt.hashSync(password,10);
     const User=new signupModel({
         Contacts:contacts,
        Password:Hash_Password,
        
 })
   await User.save((err,Data)=>{
       if(err){
           console.log(err)
           res.status(400).json({
               message:'Something went Wrong',
               Error:err
           })
       }
       else{
           const {Contacts,_id}=Data
        res.status(201).json({
            message:'User Information Saved Successfully',
            Contacts,_id
        })    
       }
   })     
})







module.exports=router;
