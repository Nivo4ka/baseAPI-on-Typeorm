import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: { status: any; message: any }, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.status).json({ message: err.message })
}