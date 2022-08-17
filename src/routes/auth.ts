import express from "express";
import authController from "./../controllers/auth/index";
import { validate } from "../middelwares/validate";
import schemes from "./../yupSchemes/index";
const router = express.Router();

router.post("/registration", validate(schemes.regSchema), authController.registration);
router.post("/login", validate(schemes.loginSchema), authController.login);

export default router;