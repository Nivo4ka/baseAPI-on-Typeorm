import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: { status: number; message: string }, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.status).json({ message: err.message })
}