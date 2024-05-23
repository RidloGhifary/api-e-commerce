import { Router } from "express";
import { Login } from "../controller/authController";

const router = Router();

router.post("/login", Login);

export default router;
