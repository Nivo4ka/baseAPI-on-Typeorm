import { Between, ILike, In } from 'typeorm';
import db from '../../db';
import type { GetAllBooksHandlerType } from '../../handlerTypes';

const getAllBooks: GetAllBooksHandlerType = async (req, res, next) => {
  try {
    const { page, pageSize, sortBy, direction, genres, minPrice, maxPrice } = req.query;
    let { search } = req.query;
    search = search || '';
    const currentPage = +page || 1;
    const currentPageSize = +pageSize || 12;
    let currentGenges = [];
    const qwe = await db.genre.find();
    if (genres) {
      currentGenges = genres.split(',');
    } else {
      currentGenges = qwe.map((item) => item.name);
    }

    const books = await db.book.findAndCount({
      where: [
        {
          title: ILike(`%${search}%`),
          genre: In(currentGenges),
          price: Between(+minPrice, +maxPrice),
        },
        {
          autor: ILike(`%${search}%`),
          genre: In(currentGenges),
          price: Between(+minPrice, +maxPrice),
        },
      ],
      order: {
        [sortBy]: direction,
      },
      skip: ((currentPage - 1) * currentPageSize),
      take: currentPageSize,
    });
    return res.json({ books: books[0], count: books[1] });
  } catch (err) {
    return next(err);
  }
};

export default getAllBooks;
