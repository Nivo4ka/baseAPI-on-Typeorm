import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  fullName: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ type: "date" })
  birthDay: Date;
}
