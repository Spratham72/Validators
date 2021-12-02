const express=require('express');
const connect=require('./config/db');
const userController=require('./controller/user.controller');
const app=express();
app.use(express.json());
app.use('/user',userController);

const start=async()=>{
    await connect();
    app.listen(1234,()=>{
        console.log("server is running on port 1234")
    })
}

module.exports=start;