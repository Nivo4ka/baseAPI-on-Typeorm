import CryptoJS from 'crypto-js';
import config from '../config';

export const comparePasswords = (possible: string, hashPassword: string) => {
  return createHashPassword(possible) === hashPassword;
};

export const createHashPassword = (password: string) => {
  return CryptoJS.HmacSHA256(password, config.password.solt)
    .toString(CryptoJS.enc.Hex);
};
