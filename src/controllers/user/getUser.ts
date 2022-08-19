import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
// import db from '../../db';
import ApiError from '../../error/ApiError';

const getUser: Handler = async (req, res, next) => {
  try {
    const { user } = req;
    if (!user) {
      return next(new ApiError({ statusCode: StatusCodes.NOT_FOUND, message: 'User not found', data: '' }));
    }
    return res.send({ user });
  } catch (err) {
    return next(err);
  }
};

export default getUser;
