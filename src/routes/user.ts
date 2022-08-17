import express from "express";
import userController from "./../controllers/user/index";
import { isAuth } from "./../middelwares/isAuth"
import { validate } from "../middelwares/validate";
import schemes from "./../yupSchemes/index";
const router = express.Router();

router.get("/read", isAuth, validate(schemes.infoSchema), userController.read);
router.patch("/change", isAuth, validate(schemes.changeSchema), userController.change);
router.delete("/delete", isAuth, validate(schemes.infoSchema), userController.deleteUser);

export default router;