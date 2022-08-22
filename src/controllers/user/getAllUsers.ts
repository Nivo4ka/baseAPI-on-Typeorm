import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '../../db';
import ApiError from '../../error/ApiError';

const getAllUsers: Handler = async (req, res, next) => {
  try {
    const { user } = req;
    if (!user) {
      return next(new ApiError({ statusCode: StatusCodes.NOT_FOUND, message: 'User not found' }));
    }
    const allUsers = await db.user.find({});
    return res.send({ allUsers });
  } catch (err) {
    return next(err);
  }
};

export default getAllUsers;
