import { Router } from "express";
import userController from "./../controllers/user/index";
import { isAuth } from "./../middelwares/isAuth"
const router = new (Router as any)();

router.get("/read", isAuth, userController.read);
router.patch("/change", isAuth, userController.change);
router.delete("/delete", isAuth, userController.deleteUser);

export default router;