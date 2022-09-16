import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import Book from './Book';
import User from './User';

@Entity({ name: 'favorite' })
class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'integer',
    nullable: false,
  })
  bookId: number;

  @Column({
    type: 'integer',
    nullable: false,
  })
  userId: number;

  @ManyToOne(() => Book, { nullable: false })
  @JoinColumn({ name: 'bookId', referencedColumnName: 'id' })
  book: Book;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}

export default Favorite;
