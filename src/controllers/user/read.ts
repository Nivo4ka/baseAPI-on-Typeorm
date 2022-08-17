import { NextFunction, Request, Response } from "express";
import { useAppDataSource } from "../../db/index";
import { ApiError } from "../../error/apiError";

export const read = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, userEmail } = req.body;
  const user = await useAppDataSource.findOneBy({
    id: userId,
    email: userEmail,
  });
  if (!user) {
    return next(ApiError.forNotFound("Пользователь не найден"));
  }
  return res.send({ user });
}