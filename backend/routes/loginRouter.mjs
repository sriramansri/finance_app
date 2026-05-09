import express from "express";
import { login, sendOTP, resetPassword } from "../controllers/login_Controller.mjs";

const router = express.Router();
router.use(express.json());

// clean paths
router.post("/api/login", login);
router.post("/api/send-otp", sendOTP);
router.post("/api/reset-password", resetPassword);

export default router;