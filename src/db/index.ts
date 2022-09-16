import AppDataSource from './dataSource';
import Book from './entities/Book';
import Cart from './entities/Cart';
import Favorite from './entities/Favorite';
import Genre from './entities/Genre';
import Rating from './entities/Rating';
import User from './entities/User';

export default {
  user: AppDataSource.getRepository(User),
  book: AppDataSource.getRepository(Book),
  genre: AppDataSource.getRepository(Genre),
  rating: AppDataSource.getRepository(Rating),
  favorite: AppDataSource.getRepository(Favorite),
  cart: AppDataSource.getRepository(Cart),
};
