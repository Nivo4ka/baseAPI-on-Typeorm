import CryptoJS from 'crypto-js';
import config from '../config';

export const comparePasswords = (possible: string, hashPassword: string) => {
  const hash = CryptoJS.SHA256(possible + config.password.solt).toString(CryptoJS.enc.Hex);
  return hash === hashPassword;
};

export const createHashPassword = (password: string) => {
  return CryptoJS.SHA256(password + config.password.solt)
    .toString(CryptoJS.enc.Hex);
};
