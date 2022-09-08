import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'genres' })
class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;
}

export default Genre;
