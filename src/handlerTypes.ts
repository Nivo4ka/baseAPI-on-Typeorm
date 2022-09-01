import type { RequestHandler } from 'express';
import type User from './db/entities/User';

export type ParamsType = Record<string, never>;

export type ResponseType = {
  user: User;
  token?: string;
};

export type GetAllUsersResponseType = {
  allUsers: User[];
};

export type DeleteUserResponseType = {
  message: string;
};

export type AuthBodyType = {
  email: string;
  password: string;
};

export type PatchUserInfoBodyType = {
  fullName: string;
  email: string;
};

export type PatchUserPasswordBodyType = {
  password: string;
  newPassword: string;
};

export type BodyType = Record<string, never>;

export type QueryType = Record<string, never>;

export type AuthHandlerType =
  RequestHandler<ParamsType, ResponseType, AuthBodyType, QueryType>;

export type PatchUserInfoHandlerType =
  RequestHandler<ParamsType, ResponseType, PatchUserInfoBodyType, QueryType>;

export type PatchUserPasswordHandlerType =
  RequestHandler<ParamsType, ResponseType, PatchUserPasswordBodyType, QueryType>;

export type DeleteUserHandlerType =
  RequestHandler<ParamsType, DeleteUserResponseType, BodyType, QueryType>;

export type GetUserHandlerType =
  RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export type GetAllUsersHandlerType =
  RequestHandler<ParamsType, GetAllUsersResponseType, BodyType, QueryType>;
