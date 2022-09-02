import jwt from 'jsonwebtoken';
import config from '../config';

export const generateJwt = (id: number) => {
  return jwt.sign({ id }, config.token.secret, { expiresIn: config.token.expiration });
};

export const parseJwt = (token: string) => {
  return jwt.verify(token, config.token.secret) as { id: number };
};
