import db from '../../db';
import Favorite from '../../db/entities/Favorite';
import type { AddToFavoriteHandlerType } from '../../handlerTypes';
import { existingBookError, notFoundBookError } from '../../utils/errorHelper';

const addToFavorite: AddToFavoriteHandlerType = async (req, res, next) => {
  try {
    const { user } = req;
    const { bookId } = req.params;

    const isBookFavorite = user.favorites.find((item) => item.bookId === +bookId);
    if (isBookFavorite) {
      return next(existingBookError);
    }
    const book = await db.book.createQueryBuilder('books').where('books.id = :bookId', { bookId }).getOne();
    if (!book) {
      return next(notFoundBookError);
    }

    const favorite = new Favorite();
    favorite.book = book;
    favorite.user = user;
    await db.favorite.save(favorite);
    const favorites = await db.favorite.find({ where: { userId: user.id } });
    return res.send({ favorites });
  } catch (err) {
    return next(err);
  }
};

export default addToFavorite;
