
import express from "express";
import {login} from "../controllers/finance_Controller.mjs";

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/api/login",login);
export default router;
