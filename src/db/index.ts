import AppDataSource from './dataSource';
import Book from './entities/Book';
import Genre from './entities/Genre';
import Rating from './entities/Rating';
import User from './entities/User';

export default {
  user: AppDataSource.getRepository(User),
  book: AppDataSource.getRepository(Book),
  genre: AppDataSource.getRepository(Genre),
  rating: AppDataSource.getRepository(Rating),
};
