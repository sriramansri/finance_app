import express from "express";
import router from "./routes/routesPath.mjs";
import cors from "cors";

const port=5000;
const app=express();

// medielwar
app.use(cors());
express.json();

<<<<<<< HEAD

=======
>>>>>>> 807adaec566be50b02cd27770d3c7a92bfa93a33
app.use(router);


app.listen(port,()=>{
    console.log("server is running....")
})


https:loaclhost:5000