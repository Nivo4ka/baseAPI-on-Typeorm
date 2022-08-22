import type { Handler } from 'express';
import CryptoJS from 'crypto-js';
import { StatusCodes } from 'http-status-codes';
import User from '../../db/entities/User';
import { generateJwt } from '../../utils/tokenHalper';
import db from '../../db';
import ApiError from '../../error/ApiError';
import config from '../../config';

const singUp: Handler = async (req, res, next) => {
  try {
    const { fullName, email, password, birthDay } = req.body;
    const candidate = await db.user.findOneBy({
      email,
    });
    if (candidate) {
      return next(new ApiError({ statusCode: StatusCodes.CONFLICT, message: 'User with this email already exists' }));
    }
    const hashPassword = CryptoJS.SHA256(password + config.password.solt)
      .toString(CryptoJS.enc.Hex);
    let user = new User();
    user.fullName = fullName;
    user.password = hashPassword;
    user.email = email;
    user.birthDay = birthDay;
    user = await db.user.save(user);
    delete user.password;
    const token = generateJwt(user.id);
    return res.json({ token, user });
  } catch (err) {
    return next(err);
  }
};

export default singUp;
