import User from '../../db/entities/User';
import { generateJwt } from '../../utils/tokenHalper';
import db from '../../db';
import { createHashPassword } from '../../utils/passwordHalper';
import type { AuthHandlerType } from '../../handlerTypes';
import { existingUserError } from '../../utils/errorHalper';

const singUp: AuthHandlerType = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await db.user.findOneBy({ email });
    if (existingUser) {
      return next(existingUserError);
    }

    const hashPassword = createHashPassword(password);

    let user = new User();
    user.password = hashPassword;
    user.email = email;
    user = await db.user.save(user);
    delete user.password;

    const token = generateJwt(user.id);
    return res.json({ token, user });
  } catch (err) {
    return next(err);
  }
};

export default singUp;
