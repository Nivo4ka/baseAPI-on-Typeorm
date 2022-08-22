import { DataSource } from 'typeorm';
import config from '../config';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.dbName,
  synchronize: false,
  logging: false,
  entities: [`${__dirname}/entities/*`],
  migrations: [`${__dirname}/migrations/*`],
});

export default AppDataSource;
