import { In } from 'typeorm';
import db from '../../db';
import type { GetBooksByArrayHandlerType } from '../../handlerTypes';

const getBooksByArray: GetBooksByArrayHandlerType = async (req, res, next) => {
  try {
    const { bookIds } = req.query;
    let currentIds: number[] = [];
    if (bookIds) {
      currentIds = bookIds.split(',').map((item) => +item);
    }

    const books = await db.book.find({
      where: {
        id: In(currentIds),
      },
    });

    return res.json({ books });
  } catch (err) {
    return next(err);
  }
};

export default getBooksByArray;
