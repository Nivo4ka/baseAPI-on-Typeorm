import { Entity, PrimaryGeneratedColumn, Column, AfterUpdate, AfterLoad } from 'typeorm';
import { convertToFinalUrl } from '../../utils/urlHelper';

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

  @AfterLoad()
  @AfterUpdate()
  public getAvatar() {
    this.avatar = convertToFinalUrl(this.avatar);
  }
}

export default User;
