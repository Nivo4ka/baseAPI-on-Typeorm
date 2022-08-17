import { Router } from "express";
import authController from "./../controllers/auth/index";
const router = new (Router as any)();

router.post("/registration", authController.registration);
router.post("/login", authController.login);

export default router;