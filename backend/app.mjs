import express from "express";
import router from "./routes/routesPath.mjs";
import cors from "cors";

const port=5000;
const app=express();
app.use(cors());

express.json();

app.use(router);

app.listen(port,()=>{
    console.log("server is running....")
})