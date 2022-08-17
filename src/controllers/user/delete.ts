import { NextFunction, Request, Response } from "express";
import { useAppDataSource } from "../../db/index";
import { ApiError } from "../../error/apiError";

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, userEmail } = req.body;
  const userToDel = await useAppDataSource.findOneBy({
    id: userId,
    email: userEmail,
  });
  if (!userToDel) {
    return next(ApiError.forNotFound("Пользователь не найден"));
  }
  await useAppDataSource.remove(userToDel);
  return res.send({ user: "deleted" });
}