import { NextFunction, Request, Response } from "express";
import CryptoJS from "crypto-js";
import { User } from "../../db/entities/User";
import { generateJwt } from "./../../utils/tokenHalper"
import { useAppDataSource } from "../../db/index";
import { ApiError } from "../../error/apiError";

export const registration = async (req: Request, res: Response, next: NextFunction) => {
  const { fullName, email, password, birthDay } = req.body;
  const candidate = await useAppDataSource.findOneBy({
    email,
  });

  if (candidate) {
    return next(ApiError.forbidden("Пользователь c таким email уже существует"));
  }
  const hashPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  let user = new User();
  user.fullName = fullName;
  user.password = hashPassword;
  user.email = email;
  user.birthDay = birthDay;
  user = await useAppDataSource.save(user);
  const token = generateJwt(user.id, user.email);
  return res.json({ token });
}
