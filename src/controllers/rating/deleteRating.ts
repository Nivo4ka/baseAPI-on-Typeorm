import db from '../../db';
import type { DeleteRatingHandlerType } from '../../handlerTypes';
import { existingError, notFoundBookError } from '../../utils/errorHelper';

const deleteRating: DeleteRatingHandlerType = async (req, res, next) => {
  try {
    const { user } = req;
    const { bookId } = req.params;

    const book = await db.book.createQueryBuilder('books').where('books.id = :bookId', { bookId }).getOne();
    if (!book) {
      return next(notFoundBookError);
    }

    const isRating = book.ratings.find((item) => item.userId === user.id);
    if (!isRating) {
      return next(existingError);
    }

    await db.rating.delete(isRating.id);
    const ratings = await db.rating.find({ where: { bookId: book.id } });
    return res.send({ ratings });
  } catch (err) {
    return next(err);
  }
};

export default deleteRating;
