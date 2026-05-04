import express from "express"
import { deleteStaff, insertStaff,updateStaff} from "../controllers/adminController.mjs";
import { verifyToken } from "../Middleware/adminmiddleware.mjs"

const admin = express.Router();

admin.post("/api/insert-Staff",verifyToken,insertStaff);
admin.put("/api/update-Staff/:id",verifyToken,updateStaff);
admin.delete("/api/delete-Staff/:id",verifyToken,deleteStaff);


export default admin