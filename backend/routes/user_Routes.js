import express from "express";
const router = express.Router();
import { authUser, registerUser } from "../controllers/user_controller.js";

router.post("/register", registerUser);
router.post("/login", authUser);

export default router;
