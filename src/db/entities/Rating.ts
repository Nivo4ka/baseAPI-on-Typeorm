import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import Book from './Book';
import User from './User';

@Entity({ name: 'rating' })
class Rating {
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

  @Column({
    type: 'varchar',
    nullable: false,
  })
  grade: string;

  @ManyToOne(() => Book, { nullable: false })
  @JoinColumn({ name: 'bookId', referencedColumnName: 'id' })
  book: Book;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}

export default Rating;
