// import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import config from "../config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.nameDB,
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
