import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { parseJwt } from '../utils/tokenHalper';
import ApiError from '../error/ApiError';
import db from '../db';

const isAuth: Handler = async (req, res, next) => {
  const { headers } = req;
  try {
    if (!headers.authorization) {
      return next(new ApiError({ statusCode: StatusCodes.UNAUTHORIZED, message: 'User not authorized', data: '' }));
    }
    const token = headers.authorization.split(' ')[1];
    if (!token) {
      return next(new ApiError({ statusCode: StatusCodes.UNAUTHORIZED, message: 'User not authorized', data: '' }));
    }
    const decoded = parseJwt(token);
    const user = await db.user.findOne({ where: { id: +decoded.id } });
    if (!user) {
      return next(new ApiError({ statusCode: StatusCodes.NOT_FOUND, message: 'User not found', data: '' }));
    }
    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
      return next(new ApiError({ statusCode: StatusCodes.NOT_ACCEPTABLE, message: err.message }));
    }
    return next(err);
  }
};

export default isAuth;
