import express from "express";

const port=5000;
const app=express();

app.use("/",(req,res)=>{
    res.send("hello");
})

app.listen(port,()=>{
    console.log("server is running....")
})