import db from '../../db';
import Rating from '../../db/entities/Rating';
import type { AddRatingHandlerType } from '../../handlerTypes';
import { notFoundBookError } from '../../utils/errorHelper';

const addRating: AddRatingHandlerType = async (req, res, next) => {
  try {
    const { user } = req;
    const { bookId } = req.params;
    const { grade } = req.body;

    const book = await db.book.findOne({
      where: {
        id: +bookId,
      },
    });
    if (!book) {
      return next(notFoundBookError);
    }
    const rating = await db.rating.findOne({
      where: {
        bookId: book.id,
        userId: user.id,
      },
    });
    if (rating) {
      rating.grade = grade;
      await db.rating.save(rating);
    } else {
      const rating = new Rating();
      rating.book = book;
      rating.user = user;
      rating.grade = grade;
      await db.rating.save(rating);
    }
    const reWriteRating = await db.rating.find({
      where: {
        bookId: book.id,
      },
    });
    book.rating = reWriteRating.reduce((acc, item) => acc + item.grade, 0) / reWriteRating.length;
    db.book.save(book);
    const ratings = await db.rating.find({ where: { userId: user.id } });
    return res.send({ ratings });
  } catch (err) {
    return next(err);
  }
};

export default addRating;
