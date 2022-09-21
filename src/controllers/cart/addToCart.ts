import db from '../../db';
import Cart from '../../db/entities/Cart';
import type { AddToCartHandlerType } from '../../handlerTypes';
import { existingBookError, notFoundBookError } from '../../utils/errorHelper';

const addToCart: AddToCartHandlerType = async (req, res, next) => {
  try {
    const { user } = req;
    const { bookId } = req.params;

    const isBookInCart = user.cart.find((item) => item.bookId === +bookId);
    if (isBookInCart) {
      return next(existingBookError);
    }
    const book = await db.book.createQueryBuilder('books').where('books.id = :bookId', { bookId }).getOne();
    if (!book) {
      return next(notFoundBookError);
    }

    const cart = new Cart();
    cart.book = book;
    cart.user = user;
    await db.cart.save(cart);
    const carts = await db.cart.find({ where: { userId: user.id } });
    return res.send({ cart: carts });
  } catch (err) {
    return next(err);
  }
};

export default addToCart;
