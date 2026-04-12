
import express from "express";
import {login} from "../controllers/finance_Controller.mjs";

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/api/login",login);
<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> 807adaec566be50b02cd27770d3c7a92bfa93a33
