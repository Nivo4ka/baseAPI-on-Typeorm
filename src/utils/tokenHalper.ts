import * as jwt from "jsonwebtoken";
import config from "./../config";

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    id: string;
    email: string;
  }
}

interface JwtPayload {
  id: string;
  email: string;
}

export const generateJwt = (id: string, email: string) => {
  return jwt.sign({ id, email }, config.secretKey, { expiresIn: "24h" });
};

export const parseJwt = (token: string) => {
  return jwt.verify(token, config.secretKey) as JwtPayload;
};