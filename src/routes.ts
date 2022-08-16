import express, { Request, Response } from "express";
import { User } from "./entity/User";
import { UserController } from "./controller/UserController";

const router = express.Router();



router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.get("/check", UserController.check);
router.get("/read", UserController.read);
router.patch("/change", UserController.change);
router.delete("/delete", UserController.delete);

export default router;

// export const Routes = [
//   {
//     method: "post",
//     route: "/api/user/registration",
//     controller: UserController,
//     action: "registration",
//   },
//   {
//     method: "post",
//     route: "/api/user/login",
//     controller: UserController,
//     action: "login",
//   },
//   {
//     method: "get",
//     route: "/api/user/check",
//     controller: UserController,
//     action: "check",
//   },
//   {
//     method: "get",
//     route: "/api/user/read",
//     controller: UserController,
//     action: "read",
//   },
//   {
//     method: "patch",
//     route: "/api/user/change",
//     controller: UserController,
//     action: "change",
//   },
//   {
//     method: "delete",
//     route: "/api/user/delete",
//     controller: UserController,
//     action: "delete",
//   },
// ];
