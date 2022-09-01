import type { GetUserHandlerType } from '../../handlerTypes';

const getUser: GetUserHandlerType = async (req, res, next) => {
  try {
    const { user } = req;
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
};

export default getUser;
