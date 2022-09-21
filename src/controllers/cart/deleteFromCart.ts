import db from '../../db';
import type { AddToCartHandlerType } from '../../handlerTypes';
import { notFoundBookError } from '../../utils/errorHelper';

const addToFavorite: AddToCartHandlerType = async (req, res, next) => {
  try {
    const { user } = req;
    const { bookId } = req.params;

    const isBookInCart = user.cart.find((item) => item.bookId === +bookId);
    if (!isBookInCart) {
      return next(notFoundBookError);
    }
    const book = await db.book.createQueryBuilder('books').where('books.id = :bookId', { bookId }).getOne();
    if (!book) {
      return next(notFoundBookError);
    }

    await db.cart.delete(isBookInCart.id);
    const cart = await db.cart.find({ where: { userId: user.id } });
    return res.send({ cart });
  } catch (err) {
    return next(err);
  }
};

export default addToFavorite;
