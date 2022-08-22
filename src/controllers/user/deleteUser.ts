import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '../../db';
import ApiError from '../../error/ApiError';

const deleteUser: Handler = async (req, res, next) => {
  try {
    const { user } = req;
    if (!user) {
      return next(new ApiError({ statusCode: StatusCodes.NOT_FOUND, message: 'User not found' }));
    }
    await db.user.remove(user);
    return res.send({ message: 'user deleted' });
  } catch (err) {
    return next(err);
  }
};

export default deleteUser;
