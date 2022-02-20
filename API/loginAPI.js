const express=require('express');
const router=express.Router();
const signupModel=require('../models/signupModel')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const  {body,validationResult}=require('express-validator');


//making scratch folder and storing some information(work like cache) in it 
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

//validation messages (occur only if there is wrong validation)
  const loginRequirement=[
    body('contacts')
    .notEmpty()
    .withMessage(' contacts  is required')
    .isLength({ min: 10,max:10})
    .withMessage('Contacts must be valid indian mobile number'),
    body('password')
    .notEmpty()
    .withMessage('Password is required')
]

//Giving wrong validation messages as response 
const Validation=  (req,res,next)=> {const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json({ error: errors.array()[0].msg })
    }
    next();
    }


     //here user can login
    router.post('/api/login',loginRequirement,Validation,async (req,res)=>{
        const contacts=req.body.contacts;
        const legalContacts=signupModel.findOne({
            Contacts:contacts
        })
        await   legalContacts.exec((err,Data)=>{
            if(err) throw err
            if(Data){
                 const {Password,Contacts,_id}=Data
                if(bcrypt.compareSync(req.body.password,Password)){
                   
                    var token = jwt.sign({ _id: _id,Contacts:Contacts}, process.env.SecretKey);
                    localStorage.setItem("loginNumber",Contacts);
                    localStorage.setItem('loginToken',token);
                 
                 res.status(200).json({
                     token,
                     Contacts
                 })  
                
               
               
            }
        
            else{
                res.status(400).json({
                    Message:'Invalid password '
                })
            }
        }
        else{
            res.status(400).json({
                message:'You have to signup First'
            })
        }
    })
    })


    router.get('/logout',(req,res)=>{
        localStorage.removeItem('loginNumber')
        localStorage.removeItem('loginToken')
        res.json({
            Message:'logout Successfully'
        })
    
    })

module.exports=router;