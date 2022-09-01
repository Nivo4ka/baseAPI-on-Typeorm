import db from '../../db';
import type { DeleteUserHandlerType } from '../../handlerTypes';

const deleteUser: DeleteUserHandlerType = async (req, res, next) => {
  try {
    const { user } = req;

    await db.user.remove(user);
    return res.send({ message: 'user deleted' });
  } catch (err) {
    return next(err);
  }
};

export default deleteUser;
