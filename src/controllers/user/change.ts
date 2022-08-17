import { NextFunction, Response } from "express";
import { useAppDataSource } from "../../db/index";
import { ApiError } from "../../error/apiError";

export const change = async (
  req: { body: any },
  res: Response,
  next: NextFunction
) => {
  const { fullName, birthDay, userId, userEmail } = req.body;
  const user = await useAppDataSource.findOneBy({
    id: userId,
    email: userEmail,
  });
  if (fullName) user.fullName = fullName;

  if (birthDay) {
    const dateBirth = Date.parse(birthDay);
    if (!dateBirth) {
      return next(ApiError.forIncorrectValue("Некорректная birthDay"));
    }

    user.birthDay = new Date(dateBirth);
  }
  await useAppDataSource.save(user);
  return res.send({ user });
}