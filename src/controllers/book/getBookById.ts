import db from '../../db';
import type { GetBookByIdHandlerType } from '../../handlerTypes';
import { notFoundBookError } from '../../utils/errorHelper';

const getBookById: GetBookByIdHandlerType = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const book = await db.book.findOne({
      where: {
        id: +bookId,
      },
    });
    if (!book) {
      return notFoundBookError;
    }
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
};

export default getBookById;
