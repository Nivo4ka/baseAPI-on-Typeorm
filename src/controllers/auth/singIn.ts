import { NextFunction, Request, Response } from "express";
import CryptoJS from "crypto-js";
import { generateJwt } from "./../../utils/tokenHalper"
import { useAppDataSource } from "../../db/index";
import { ApiError } from "../../error/apiError";

const comparePasswors = (possible: string, hashPassword: string) => {
  const hash = CryptoJS.SHA256(possible).toString(CryptoJS.enc.Hex);
  return hash === hashPassword;
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = await useAppDataSource.findOneBy({ email });
  if (!user) {
    return next(ApiError.forNotFound("Пользователь не найден"));
  }
  let comparePassword = comparePasswors(password, user.password);
  if (!comparePassword) {
    return next(ApiError.forIncorrectValue("Указан неверный пароль"));
  }
  const token = generateJwt(user.id, user.email);
  return res.json({ token });
}