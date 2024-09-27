const express=require('express');
const { connectDB } = require('./database/connectDB');
require("dotenv").config();
const app=express();
const PORT=3000;

app.get('/',(req,res)=>{
    res.send("Hello world")
})

app.listen(PORT,()=>{
    connectDB();
    console.log('The server is running',PORT)
});

