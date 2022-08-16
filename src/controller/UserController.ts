import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import { AppDataSource } from "./../data-source";
import { User } from "../entity/User";
require("dotenv").config();

interface JwtPayload {
  id: string;
  email: string;
}

const generateJwt = (id: string, email: string) => {
  return jwt.sign({ id, email }, "DerevyankoOA", { expiresIn: "24h" });
};

const parseJwt = (token: string) => {
  return jwt.verify(token, "DerevyankoOA") as JwtPayload;
};

const comparePasswors = (possible: string, hashPassword: string) => {
  const hash = CryptoJS.SHA256(possible).toString(CryptoJS.enc.Hex);
  return hash === hashPassword;
};

export class UserController {
  static async registration(req: Request, res: Response, next: NextFunction) {
    const { fullName, email, password, birthDay } = req.body;

    if (!email || !password || !fullName || !birthDay) {
      return next(
        res.status(404).send({
          message: "Некорректный email, password, birthDay или fullName",
        })
      );
    }
    const dateBirth = Date.parse(birthDay);
    if (!dateBirth) {
      return next(res.status(404).send({ message: "Некорректная birthDay" }));
    }
    const candidate = await AppDataSource.getRepository(User).findOneBy({
      email,
    });

    if (candidate) {
      return next(
        res.status(404).send({
          message: "Пользователь c таким email уже существует",
        })
      );
    }
    const hashPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    let user = new User();
    user.fullName = fullName;
    user.password = hashPassword;
    user.email = email;
    user.birthDay = new Date(dateBirth);
    user = await AppDataSource.getRepository(User).save(user);
    const token = generateJwt(user.id, user.email);
    return res.json({ token });
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const user = await AppDataSource.getRepository(User).findOneBy({ email });
    if (!user) {
      return next(res.status(500).send({ message: "Пользователь не найден" }));
    }
    let comparePassword = comparePasswors(password, user.password);
    if (!comparePassword) {
      return next(res.status(500).send({ message: "Указан неверный пароль" }));
    }
    const token = generateJwt(user.id, user.email);
    return res.json({ token });
  }

  static async read(req: { headers: any }, res: Response, next: NextFunction) {
    const { headers } = req;
    if (headers && headers.token) {
      const { id, email } = parseJwt(headers.token);
      const user = await AppDataSource.getRepository(User).findOneBy({
        id,
        email,
      });
      return res.send({ user });
    } else
      return next(
        res.status(500).send({ message: "Пользователь не авторизирован" })
      );
  }

  static async check(req: { headers: any }, res: Response, next: NextFunction) {
    const { headers } = req;
    const { token } = headers;
    try {
      if (headers && token) {
        var decoded = parseJwt(token);
        return res.json({ token });
      } else
        return next(
          res.status(500).send({ message: "Пользователь не авторизирован" })
        );
    } catch (err) {
      return next(res.status(500).send({ err }));
    }
  }

  static async change(
    req: { headers: any; body: any },
    res: Response,
    next: NextFunction
  ) {
    const { headers, body } = req;
    const { fullName, birthDay } = body;
    if (headers && headers.token) {
      const { id, email } = parseJwt(headers.token);
      const user = await AppDataSource.getRepository(User).findOneBy({
        id,
        email,
      });
      if (fullName) user.fullName = fullName;

      if (birthDay) {
        const dateBirth = Date.parse(birthDay);
        if (!dateBirth) {
          return res.status(404).send({ message: "Некорректная birthDay" });
        }

        user.birthDay = new Date(dateBirth);
      }

      await AppDataSource.getRepository(User).save(user);
      return res.send({ user });
    } else
      return res.status(500).send({ message: "Пользователь не авторизирован" });
  }

  static async delete(
    req: { headers: any },
    res: Response,
    next: NextFunction
  ) {
    const { headers } = req;
    if (headers && headers.token) {
      const { id, email } = parseJwt(headers.token);
      const userToDel = await AppDataSource.getRepository(User).findOneBy({
        id,
        email,
      });
      await AppDataSource.getRepository(User).remove(userToDel);
      return res.send({ user: "deleted" });
    } else
      return res.status(500).send({ message: "Пользователь не авторизирован" });
  }
}
