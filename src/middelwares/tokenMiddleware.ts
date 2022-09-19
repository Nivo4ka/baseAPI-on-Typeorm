import type { Handler } from 'express';
import { parseJwt } from '../utils/tokenHelper';
import db from '../db';
import { authError, notFoundError, tokenExpiredError, tokenInvalidError } from '../utils/errorHelper';

const tokenMiddleware: Handler = async (req, res, next) => {
  const { headers } = req;
  try {
    if (!headers.authorization) {
      return next(authError);
    }
    const token = headers.authorization.split(' ')[1];
    if (!token) {
      return next(authError);
    }
    const decoded = parseJwt(token);
    const user = await db.user.findOne({
      relations: { favorites: true, cart: true, ratings: true },
      where: { id: +decoded.id },
    });
    if (!user) {
      return next(notFoundError);
    }
    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(tokenExpiredError);
    }
    if (err.name === 'JsonWebTokenError') {
      return next(tokenInvalidError);
    }
    return next(err);
  }
};

export default tokenMiddleware;
