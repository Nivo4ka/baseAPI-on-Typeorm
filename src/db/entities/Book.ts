import { Entity, PrimaryGeneratedColumn, Column, AfterLoad, ManyToOne, JoinColumn } from 'typeorm';
import { convertToFinalUrl } from '../../utils/urlHelper';
import Genre from './Genre';

@Entity({ name: 'books' })
class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  autor: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  genreId: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'float',
    nullable: false,
  })
  price: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  cover: string;

  @ManyToOne(() => Genre, (genre) => genre.id, { nullable: false })
  @JoinColumn({ name: 'genreId', referencedColumnName: 'id' })
  genre: Genre;

  @Column({
    type: 'float',
    nullable: true,
    default: 0,
  })
  rating: number;

  @AfterLoad()
  public getCover() {
    this.cover = convertToFinalUrl(this.cover, 'books');
  }
}

export default Book;
