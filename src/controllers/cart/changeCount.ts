import db from '../../db';
import type { ChangeCountHandlerType } from '../../handlerTypes';
import { notFoundBookError } from '../../utils/errorHelper';

const addToFavorite: ChangeCountHandlerType = async (req, res, next) => {
  try {
    const { user } = req;
    const { bookId } = req.params;
    const { count } = req.body;

    const book = await db.book.createQueryBuilder('books').where('books.id = :bookId', { bookId }).getOne();
    if (!book) {
      return next(notFoundBookError);
    }

    const isBookInCart = await db.cart.findOne({
      where: {
        bookId: book.id,
        userId: user.id,
      },
    });
    if (!isBookInCart) {
      return next(notFoundBookError);
    }

    isBookInCart.count += count;
    if (isBookInCart.count) {
      await db.cart.save(isBookInCart);
    } else {
      await db.cart.delete(isBookInCart.id);
    }

    const cart = await db.cart.find({ where: { userId: user.id } });
    return res.send({ cart });
  } catch (err) {
    return next(err);
  }
};

export default addToFavorite;
