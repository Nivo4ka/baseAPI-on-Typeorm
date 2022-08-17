import { NextFunction, Request, Response } from "express";
import { useAppDataSource } from "../../db/index";
import { ApiError } from "../../error/apiError";

export const change = async (req: Request, res: Response, next: NextFunction) => {
  const { fullName, birthDay, userId, userEmail } = req.body;
  const user = await useAppDataSource.findOneBy({
    id: userId,
    email: userEmail,
  });
  if (!user) {
    return next(ApiError.forNotFound("Пользователь не найден"));
  }
  if (fullName) user.fullName = fullName;

  if (birthDay) {
    user.birthDay = birthDay;
  }
  await useAppDataSource.save(user);
  return res.send({ user });
}