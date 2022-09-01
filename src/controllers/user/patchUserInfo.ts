import db from '../../db';
import type { PatchUserInfoHandlerType } from '../../handlerTypes';

const patchUserInfo: PatchUserInfoHandlerType = async (req, res, next) => {
  try {
    const { fullName, email } = req.body;
    const { user } = req;

    if (fullName) {
      user.fullName = fullName;
    }

    user.email = email;
    await db.user.save(user);

    return res.send({ user });
  } catch (err) {
    return next(err);
  }
};

export default patchUserInfo;
