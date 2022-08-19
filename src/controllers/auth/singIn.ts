import type { Handler } from 'express';
import CryptoJS from 'crypto-js';
import { StatusCodes } from 'http-status-codes';
import { generateJwt } from '../../utils/tokenHalper';
import db from '../../db';
import ApiError from '../../error/ApiError';
import config from '../../config';

const comparePasswors = (possible: string, hashPassword: string) => {
  const hash = CryptoJS.SHA256(possible + config.password.solt).toString(CryptoJS.enc.Hex);
  return hash === hashPassword;
};

const singIn: Handler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await db.user.findOne({
      select: ['password'],
      where: { email },
    });
    if (!user) {
      return next(new ApiError({ statusCode: StatusCodes.NOT_FOUND, message: 'User not found', data: '' }));
    }
    const comparePassword = comparePasswors(password, user.password);
    if (!comparePassword) {
      return next(new ApiError({ statusCode: StatusCodes.NOT_ACCEPTABLE, message: 'Incorrent password', data: '' }));
    }
    user = await db.user.findOne({
      where: { email },
    });
    const token = generateJwt(user.id);
    return res.json({ token, user });
  } catch (err) {
    return next(err);
  }
};

export default singIn;
