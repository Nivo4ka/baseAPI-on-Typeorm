import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '../../db';
import ApiError from '../../error/ApiError';

const patchUser: Handler = async (req, res, next) => {
  try {
    const { fullName, birthDay } = req.body;
    const { user } = req;
    if (!user) {
      return next(new ApiError({ statusCode: StatusCodes.NOT_FOUND, message: 'User not found' }));
    }
    if (fullName) user.fullName = fullName;

    if (birthDay) {
      user.birthDay = birthDay;
    }
    await db.user.save(user);
    return res.send({ user });
  } catch (err) {
    return next(err);
  }
};

export default patchUser;
