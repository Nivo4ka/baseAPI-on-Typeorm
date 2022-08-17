declare namespace Express {
  export interface Request {
    userId: string,
    userEmail: string
  }
}

declare module Jsonwebtoken {
  export interface JwtPayload {
    id: string;
    email: string;
  }
}