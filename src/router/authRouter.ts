import { Router } from "express";
import { Login, Logout, Register } from "../controller/authController";

const router = Router();

router.post("/login", Login);
router.post("/register", Register);
router.get("/logout", Logout);

export default router;
