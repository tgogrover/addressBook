//require pakages
const express=require('express');
const app=express();
const mongoose=require("mongoose");
const api_Signup_Route=require('./API/signupAPI');
const api_Login_Route=require('./API/loginAPI');
const api_AddressBook_Route=require('./API/addressBookAPI');


require('dotenv').config();



//mongoose connection
mongoose.connect('mongodb://localhost:27017/VouchDigital_Assignment',
{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection.on('error',(err)=>{
console.log(' error connecting with mongodb with'+ err)
});

mongoose.connection.on('connected',()=>{
console.log('mongodb is connected with server successfully')});

//middlewares
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));
 

app.use(api_Signup_Route);
app.use(api_Login_Route);
app.use(api_AddressBook_Route);








app.listen(process.env.PORT,()=>{
    console.log(`server is successfully running on server ${process.env.PORT}`)
})