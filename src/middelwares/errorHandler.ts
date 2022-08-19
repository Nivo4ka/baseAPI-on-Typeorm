import type { ErrorRequestHandler } from 'express';
import {
  StatusCodes,
  getReasonPhrase,
} from 'http-status-codes';
import ApiError from '../error/ApiError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof ApiError) {
    return res.status(err.payload.statusCode).json(err.payload);
  }

  console.error(err);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
};

export default errorHandler;
