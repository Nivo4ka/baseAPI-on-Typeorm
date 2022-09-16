import { Entity, PrimaryGeneratedColumn, Column, AfterUpdate, AfterLoad, OneToMany, JoinTable } from 'typeorm';
import { convertToFinalUrl } from '../../utils/urlHelper';
import Cart from './Cart';
import Favorite from './Favorite';

@Entity({ name: 'users' })
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  fullName: string;

  @Column({
    type: 'varchar',
    nullable: false,
    select: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  avatar: string;

  @OneToMany(() => Favorite, (favorite) => favorite.user, { cascade: true })
  @JoinTable()
  favorites: Favorite[];

  @OneToMany(() => Cart, (cart) => cart.user, { cascade: true })
  cart: Cart[];

  @AfterLoad()
  @AfterUpdate()
  public getAvatar() {
    this.avatar = convertToFinalUrl(this.avatar, 'users');
  }
}

export default User;
