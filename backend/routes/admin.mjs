import express from "express"
import {admin} from "../controllers/finance_Controller.mjs";


const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// router.post("/api/admin",admin);

export default admin