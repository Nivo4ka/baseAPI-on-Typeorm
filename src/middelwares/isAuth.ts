import { NextFunction, Request, Response } from "express";
import { parseJwt } from "./../utils/tokenHalper";
import { ApiError } from "../error/apiError";


export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const { headers, body } = req;
  try {
    const token = headers.authorization.split(' ')[1];
    if (token) {
      const decoded = parseJwt(token);
      body.userId = decoded.id;
      body.userEmail = decoded.email
      next();
    } else {
      return next(ApiError.forNotAuth("Пользователь не авторизирован"));
    }
  } catch (err) {
    return next(ApiError.forRottenToken("Токен устарел"));
  }
}