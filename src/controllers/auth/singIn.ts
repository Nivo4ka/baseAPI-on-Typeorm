import { generateJwt } from '../../utils/tokenHalper';
import db from '../../db';
import { comparePasswords } from '../../utils/passwordHalper';
import type { AuthHandlerType } from '../../handlerTypes';
import { incorrentPasswordError, notFoundError } from '../../utils/errorHalper';

const singIn: AuthHandlerType = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // eslint-disable-next-line no-console
    console.log(req.body);
    const user = await db.user
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('email = :email', { email })
      .getOne();

    if (!user) {
      return next(notFoundError);
    }

    const comparePassword = comparePasswords(password, user.password);
    if (!comparePassword) {
      return next(incorrentPasswordError);
    }

    delete user.password;
    const token = generateJwt(user.id);
    return res.json({ token, user });
  } catch (err) {
    return next(err);
  }
};

export default singIn;
