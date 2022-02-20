const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const addressBookModel=require('../models/addressBookModel');
const authUser=require('../authMiddleware/authentication');




router.get('/api/contact/paginate/:id',(req,res)=>{
  
var {id}=req.params    
var skip=id-1;
    addressBookModel.find({},{skip:skip,limit:5}).select('Contacts,Address').exec((err,addresses)=>{
        if(addresses){
            res.status(200).json({
            addresses
            })

        }
        else{
            res.status(400).json({
                Messgae:'No addresses book available'
            })
        }

    })
});

router.post('/api/add/bulkcontacts',authUser,async(req,res)=>{
    console.log(req.body)
    addressBookModel.insertMany(req.body,(err,addressBook)=>{
        if(err){
            return res.status(400).json({
                err
            })
            
        }
        else{
            res.status(201).json({
                addressBook
            })
        }
    })
   
})


router.post('/api/add/singleContacts',authUser,async(req,res)=>{
    const {address,contacts}=req.body;
    const addressBook=new addressBookModel({
        Contacts:contacts,
        Address:address
    })
    await addressBook.save((err,book)=>{
        if(err){
         return   res.status(400).json({
                err
            })
        }
        if(book){
            res.status(201).json({
                book
            })
        }

    })
});

router.get('/api/fetch/singleContacts/:id',authUser,async(req,res)=>{
    var {id}=req.params;
    await addressBookModel.findById({_id:id}).select('Contacts Address _id')
    .exec((err,addressBook)=>{
        if(err){
            return   res.status(400).json({
                   err
               })
           }
           if(addressBook){
            res.status(200).json({
                addressBook
            })
           }
    })

});

router.post('/api/updateContact/:id',authUser,async(req,res)=>{
    var {id}=req.params;
    const {contacts,address}=req.body;
    await addressBookModel.findByIdAndUpdate(id,{Contacts:contacts,Address:address})
    .exec((err,update)=>{
        if(err){
            res.status(400).json({
                err
            })
        }
        else{
            res.status(201).json({
                update
            })
        }
    })
})


router.get('/api/deleteContact/:id',authUser,async(req,res)=>{
    var {id}=req.params;
    await addressBookModel.findByIdAndDelete(id).exec((err,Success)=>{
        if(err){
            res.status(400).json({
                err
            })
        }
        else{
            res.status(201).json({
                Message:"Address Book deleted successfully"
            })
        }

   

    })
    
})


module.exports=router;