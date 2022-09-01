import db from '../../db';
import type { GetAllUsersHandlerType } from '../../handlerTypes';

const getAllUsers: GetAllUsersHandlerType = async (req, res, next) => {
  try {
    const allUsers = await db.user.find({});
    return res.send({ allUsers });
  } catch (err) {
    return next(err);
  }
};

export default getAllUsers;
