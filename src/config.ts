import dotenv from "dotenv";
dotenv.config();
import { env } from 'process'
const localEnv = dotenv.config({ path: './../default.env' }).parsed;


export default {
  port: +env.PORT || +localEnv.PORT,
  db: {
    nameDB: env.DB_NAME + "" || localEnv.DB_NAME + "",
    username: env.DB_USERNAME + "" || localEnv.DB_USERNAME + "",
    password: env.DB_PASSWORD + "" || localEnv.DB_PASSWORD + "",
    host: env.DB_HOST + "" || localEnv.DB_HOST + "",
    port: +env.DB_PORT || +localEnv.DB_PORT,
  },
  secretKey: env.SECRET_KEY + "" || localEnv.SECRET_KEY + ""
};
