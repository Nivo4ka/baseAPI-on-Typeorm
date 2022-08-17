import { NextFunction, Response } from "express";
import { useAppDataSource } from "../../db/index";

export const read = async (req: { body: any }, res: Response, next: NextFunction) => {
  const { userId, userEmail } = req.body;
  const user = await useAppDataSource.findOneBy({
    id: userId,
    email: userEmail,
  });
  return res.send({ user });
}