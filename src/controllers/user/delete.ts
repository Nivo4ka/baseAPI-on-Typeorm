import { NextFunction, Response } from "express";
import { useAppDataSource } from "../../db/index";

export const deleteUser = async (
  req: { body: any },
  res: Response,
  next: NextFunction
) => {
  const { userId, userEmail } = req.body;
  const userToDel = await useAppDataSource.findOneBy({
    id: userId,
    email: userEmail,
  });
  await useAppDataSource.remove(userToDel);
  return res.send({ user: "deleted" });
}