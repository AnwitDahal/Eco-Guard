const express=require('express');
const cookieParser=require('cookie-parser')
const { connectDB } = require('./database/connectDB');
const appRoutes = require("./routes/app");
require("dotenv").config();
const app=express();
const PORT=5000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
    res.send("Hello world")
})

app.use('/api/app',appRoutes);

app.listen(PORT,()=>{
    connectDB();
    console.log('The server is running',PORT)
});

