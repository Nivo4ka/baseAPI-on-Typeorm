import { Brackets } from 'typeorm';
import AppDataSource from './dataSource';
import Book from './entities/Book';
import Genre from './entities/Genre';
import User from './entities/User';

export default {
  user: AppDataSource.getRepository(User),
  book: AppDataSource.getRepository(Book),
  genre: AppDataSource.getRepository(Genre),
  // .extend({
  //   filterBooks(
  //     page: number,
  //     pageSize: number,
  //     sortBy: string,
  //     direction: string,
  //     genres: string[],
  //     search: string,
  //   ) {
  //     const searchQuery = `%${search || ''}%`;
  //     return this.createQueryBuilder('books')
  //       .skip((page - 1) * pageSize)
  //       .take(pageSize)
  //       .orderBy(
  //         (sortBy || 'id'), (direction),
  //       )
  //       .where(
  //         new Brackets((qb) => {
  //           qb.where('title like :search', { searchQuery })
  //             .orWhere('autor like :search', { searchQuery });
  //         }),
  //       )
  //       .andWhere('genre IN (:genres)', { genres })
  //       .getMany();
  //   },
  // }),
};
