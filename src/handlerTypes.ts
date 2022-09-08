import type { RequestHandler } from 'express';
import type User from './db/entities/User';
import type Book from './db/entities/Book';

export type ParamsType = Record<string, never>;

export type BookParamsType = {
  bookId: string;
};

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

export type AllBooksResponseType = {
  books: Book[];
  count?: number;
};

export type BookResponseType = {
  book: Book;
};

export type AddBookBodyType = {
  title: string;
  autor: string;
  price: number;
  genre: string;
  description?: string;
  cover?: string;
};

export type AuthBodyType = {
  email: string;
  password: string;
};

export type PatchUserInfoBodyType = {
  fullName: string;
  email: string;
};

export type PatchUserImgBodyType = {
  file: string;
};

export type PatchUserPasswordBodyType = {
  password: string;
  newPassword: string;
};

export type BodyType = Record<string, never>;

export type GetAllBooksQueryType = {
  page?: string;
  pageSize?: string;
  sortBy?: string;
  direction?: 'asc' | 'desc';
  search?: string;
  genres?: string;
};

export type QueryType = Record<string, never>;

export type AuthHandlerType =
  RequestHandler<ParamsType, ResponseType, AuthBodyType, QueryType>;

export type PatchUserInfoHandlerType =
  RequestHandler<ParamsType, ResponseType, PatchUserInfoBodyType, QueryType>;

export type PatchUserImgHandlerType =
  RequestHandler<ParamsType, ResponseType, PatchUserImgBodyType, QueryType>;

export type PatchUserPasswordHandlerType =
  RequestHandler<ParamsType, ResponseType, PatchUserPasswordBodyType, QueryType>;

export type DeleteUserHandlerType =
  RequestHandler<ParamsType, DeleteUserResponseType, BodyType, QueryType>;

export type GetUserHandlerType =
  RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export type GetAllUsersHandlerType =
  RequestHandler<ParamsType, GetAllUsersResponseType, BodyType, QueryType>;

export type AddBookHandlerType =
  RequestHandler<ParamsType, BookResponseType, AddBookBodyType, QueryType>;

export type GetAllBooksHandlerType =
  RequestHandler<ParamsType, AllBooksResponseType, BodyType, GetAllBooksQueryType>;

export type GetBookByIdHandlerType =
  RequestHandler<BookParamsType, BookResponseType, BodyType, QueryType>;
