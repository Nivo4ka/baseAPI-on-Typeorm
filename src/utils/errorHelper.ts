import { StatusCodes } from 'http-status-codes';
import ApiError from '../error/ApiError';
import type { ITemplateInt } from '../middelwares/createValidationMiddleware';

export const authError = new ApiError({ statusCode: StatusCodes.UNAUTHORIZED, message: 'User not authorized' });

export const notFoundError = new ApiError({ statusCode: StatusCodes.NOT_FOUND, message: 'User not found' });

export const tokenExpiredError = new ApiError({ statusCode: StatusCodes.NOT_ACCEPTABLE, message: 'token expired' });

export const tokenInvalidError = new ApiError({ statusCode: StatusCodes.NOT_ACCEPTABLE, message: 'invalid token' });

export const incorrentPasswordError = new ApiError({ statusCode: StatusCodes.NOT_ACCEPTABLE, message: 'Incorrent password' });

export const existingUserError = new ApiError({ statusCode: StatusCodes.CONFLICT, message: 'User with this email already exists' });

export const validationError = (name:string, errorInfo: ITemplateInt[]) => {
  return new ApiError({
    statusCode: StatusCodes.NOT_ACCEPTABLE,
    message: name,
    data: errorInfo,
  });
};
