import db from '../../db';
import type { PatchUserPasswordHandlerType } from '../../handlerTypes';
import { incorrentPasswordError } from '../../utils/errorHelper';
import { comparePasswords, createHashPassword } from '../../utils/passwordHelper';

const patchUserPassword: PatchUserPasswordHandlerType = async (req, res, next) => {
  try {
    const { password, newPassword } = req.body;
    const { user } = req;

    const fullUser = await db.user
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('id = :userId', { userId: user.id })
      .getOne();

    const comparePassword = comparePasswords(password, fullUser.password);
    if (!comparePassword) {
      return next(incorrentPasswordError);
    }

    const hashPassword = createHashPassword(newPassword);
    fullUser.password = hashPassword;
    await db.user.save(fullUser);

    return res.send({ user });
  } catch (err) {
    return next(err);
  }
};

export default patchUserPassword;
