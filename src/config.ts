import dotenv from 'dotenv';
import path from 'path';

const localEnv = dotenv.config({ path: path.normalize(`${__dirname}/../.env`) }).parsed;
const defaultEnv = dotenv.config({ path: path.normalize(`${__dirname}/../default.env`) }).parsed;

const joinedEnv = {
  ...defaultEnv,
  ...localEnv,
};

const config = {
  port: +joinedEnv.PORT,
  domenName: joinedEnv.DOMEN,
  db: {
    dbName: joinedEnv.DB_NAME,
    username: joinedEnv.DB_USERNAME,
    password: joinedEnv.DB_PASSWORD,
    host: joinedEnv.DB_HOST,
    port: +joinedEnv.DB_PORT,
  },
  token: {
    secret: joinedEnv.TOKEN_SECRET_KEY,
    expiration: joinedEnv.TOKEN_EXPIRATION,
  },
  password: {
    solt: joinedEnv.PASSWORD_SOLT,
  },
  cors: {
    origin: joinedEnv.CORS_ORIGIN,
    credentials: !!joinedEnv.CORS_CREDENTIALS,
    optionsSuccessStatus: +joinedEnv.CORS_OPTIONS_SUCCESS_STATUS,
  },
};

export default config;
