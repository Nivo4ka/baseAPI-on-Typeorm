import db from '../../db';
import type { GetAllGenresHandlerType } from '../../handlerTypes';

const getAllGenres: GetAllGenresHandlerType = async (req, res, next) => {
  try {
    const genres = await db.genre.find({});
    return res.send({ genres });
  } catch (err) {
    return next(err);
  }
};

export default getAllGenres;
