const jwt=require('jsonwebtoken')
const authUser=(req,res,next)=>{
    var loginContacts=localStorage.getItem('loginNumber')
    if(loginContacts){
        const {authorisation} = req.headers;
        
     if(authorisation){
         
        var header = authorisation.split(' ')[1]
        console.log(authorisation)
    try{
     var token=jwt.verify(header, process.env.SecretKey);
     
     req.user=token
     //console.log(req.user._id)
     if(token){
        next();
     }
    
    }
     catch (err){
       return res.status(400).json
       ({
           message:err.message
    })
     }
    }

    else{
        res.status(400).json({
            Message:' Authorisation Required'
    
        })
    
    }
    }
    else{
        res.status(400).json({
            Message:'You have to login first'
    
        })
    }
    
    }

    module.exports=authUser