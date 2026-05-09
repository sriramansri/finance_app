import express from "express";
import login from "./routes/loginRouter.mjs";
import admin from "./routes/admin.mjs";
import cors from "cors";


const port=5000;
const app=express();

// middleware
app.use(cors());
app.use(express.json());


app.use(login)
app.use(admin)


app.listen(port,()=>{
    console.log("server is running....")
})