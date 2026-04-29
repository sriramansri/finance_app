import express from "express";
import { login, sendOTP, resetPassword } from "../controllers/finance_Controller.mjs";

const router = express.Router();
router.use(express.json());

router.post("/api/login", login);
router.post("/api/send-otp", sendOTP);
router.post("/api/reset-password", resetPassword);
export default router;