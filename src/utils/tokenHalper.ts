import jwt from "jsonwebtoken";
import config from "./../config";

export const generateJwt = (id: string, email: string) => {
  return jwt.sign({ id, email }, config.secretKey, { expiresIn: "24h" });
};

export const parseJwt = (token: string) => {
  return jwt.verify(token, config.secretKey) as jwt.JwtPayload;
};