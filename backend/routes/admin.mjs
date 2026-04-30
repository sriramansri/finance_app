import express from "express"
import { insertStaff,updateStaff} from "../controllers/adminController.mjs";
import { verifyToken } from "../Middleware/adminmiddleware.mjs"

const admin = express.Router();

admin.post("/api/insert-Staff",verifyToken,insertStaff);
admin.put("/api/update-Staff/:id",verifyToken,updateStaff);

export default admin