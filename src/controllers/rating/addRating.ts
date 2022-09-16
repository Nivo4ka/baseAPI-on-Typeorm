import db from '../../db';
import Rating from '../../db/entities/Rating';
import type { AddRatingHandlerType } from '../../handlerTypes';
import { existingError, notFoundBookError } from '../../utils/errorHelper';

const addRating: AddRatingHandlerType = async (req, res, next) => {
  try {
    const { user } = req;
    const { bookId } = req.params;
    const { grade } = req.body;

    const book = await db.book.createQueryBuilder('books').where('books.id = :bookId', { bookId }).getOne();
    if (!book) {
      return next(notFoundBookError);
    }

    const isRating = book.ratings.find((item) => item.userId === user.id);
    if (isRating) {
      return next(existingError);
    }

    const rating = new Rating();
    rating.book = book;
    rating.user = user;
    rating.grade = grade;
    await db.rating.save(rating);
    const ratings = await db.rating.find({ where: { bookId: book.id } });
    return res.send({ ratings });
  } catch (err) {
    return next(err);
  }
};

export default addRating;
