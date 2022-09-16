import { generateJwt } from '../../utils/tokenHelper';
import db from '../../db';
import { comparePasswords } from '../../utils/passwordHelper';
import type { AuthHandlerType } from '../../handlerTypes';
import { incorrentPasswordError, notFoundError } from '../../utils/errorHelper';

const singIn: AuthHandlerType = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await db.user
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('email = :email', { email })
      .leftJoinAndSelect('users.favorites', 'favorite')
      .leftJoinAndSelect('users.cart', 'cart')
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
    // console.log(user.favorites);
    return res.json({ token, user });
  } catch (err) {
    return next(err);
  }
};

export default singIn;
