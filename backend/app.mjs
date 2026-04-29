import express from "express";
import router from "./routes/routesPath.mjs";
import admin from "./routes/admin.mjs";
import cors from "cors";

const port=5000;
const app=express();

// middleware
app.use(cors());
express.json();


// app.use(router)
app.use(admin)


app.listen(port,()=>{
    console.log("server is running....")
})