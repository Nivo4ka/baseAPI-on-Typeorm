import db from '../../db';
import type { PatchUserInfoHandlerType } from '../../handlerTypes';
import { existingUserError } from '../../utils/errorHelper';

const patchUserInfo: PatchUserInfoHandlerType = async (req, res, next) => {
  try {
    const { fullName, email } = req.body;
    const { user } = req;

    if (fullName) {
      user.fullName = fullName;
    }

    const existEmail = await db.user.findOne({
      where: {
        email,
      },
    });

    if (existEmail && existEmail.id !== user.id) {
      return next(existingUserError);
    }

    user.email = email;
    await db.user.save(user);

    return res.send({ user });
  } catch (err) {
    return next(err);
  }
};

export default patchUserInfo;
