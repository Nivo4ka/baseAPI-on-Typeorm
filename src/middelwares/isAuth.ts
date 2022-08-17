import { NextFunction, Response } from "express";
import { parseJwt } from "./../utils/tokenHalper";
import { ApiError } from "../error/apiError";


export const isAuth = async (req: {
  userId: string;
  userEmail: string; headers: any
}, res: Response, next: NextFunction) => {
  const { headers } = req;

  try {
    if (headers.token) {
      const { token } = headers;
      const decoded = parseJwt(token);
      req.userId = decoded.id;
      req.userEmail = decoded.email
      next();
      return null;
    } else {
      return next(ApiError.forNotAuth("Пользователь не авторизирован"));
    }
  } catch (err) {
    return res.status(412).send({ err });
  }
}