import express from "express"
import {creatstaffe} from "../controllers/adminController.mjs";


const admin = express.Router();
admin.use(express.json());
admin.use(express.urlencoded({ extended: true }));

admin.post("/api/admin",creatstaffe);

export default admin