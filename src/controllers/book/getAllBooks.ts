import db from '../../db';
import type { GetAllBooksHandlerType } from '../../handlerTypes';

const getAllBooks: GetAllBooksHandlerType = async (req, res, next) => {
  try {
    const { page, pageSize, sortBy, direction, genres, minPrice, maxPrice } = req.query;
    const currentPage = +page || 1;
    const currentPageSize = +pageSize || null;
    let currentGenges: number[] = [];
    if (genres) {
      currentGenges = genres.split(',').map((item) => +item);
    }

    const query = db.book.createQueryBuilder('books');

    if (req.query.search) {
      const search = `%${req.query.search}%`;
      query.where('(books.title ILIKE :search OR books.autor ILIKE :search)', { search });
    }
    if (genres) {
      query.andWhere('books.genreId IN(:...currentGenges)', { currentGenges });
    }
    if (minPrice) {
      query.andWhere('books.price >= :minPrice', { minPrice });
    }
    if (maxPrice) {
      query.andWhere('books.price <= :maxPrice', { maxPrice });
    }
    if (sortBy) {
      query.orderBy(`books.${sortBy || 'price'}`, direction || 'ASC');
    }

    const books = await query
      .skip((currentPage - 1) * currentPageSize)
      .take(currentPageSize)
      .getManyAndCount();
    return res.json({ books: books[0], count: books[1] });
  } catch (err) {
    return next(err);
  }
};

export default getAllBooks;
