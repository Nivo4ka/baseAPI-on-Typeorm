import { Entity, PrimaryGeneratedColumn, Column, AfterUpdate, AfterLoad } from 'typeorm';
import { convertToFinalUrl } from '../../utils/urlHelper';

@Entity({ name: 'books' })
class User {
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
    type: 'varchar',
    nullable: false,
  })
  genre: string;

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

  @AfterLoad()
  public getCover() {
    this.cover = convertToFinalUrl(this.cover, 'books');
  }
}

export default User;
