import express from "express"
import {admins,addemp,editstaff} from "../controllers/adminController.mjs";


const admin = express.Router();
admin.use(express.json());
admin.use(express.urlencoded({ extended: true }));

admin.get("/api/admin",admins);
admin.post("/api/addemp",addemp);
admin.post("/api/editstaff",editstaff)


export default admin