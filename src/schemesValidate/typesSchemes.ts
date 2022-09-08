import type * as yup from 'yup';
import type { AnyObject } from 'yup/lib/types';

export type SchemaFiledType = {
  [key: string]: yup.StringSchema
  | yup.DateSchema
  | yup.NumberSchema
  | yup.ArraySchema<yup.StringSchema<string, AnyObject, string>, AnyObject, string[], string[]>;
};

export type ValidationSchemaItemType = Record<string, SchemaFiledType>;

export type ValidationSchemaType = {
  body?: SchemaFiledType;
  query?: SchemaFiledType;
  params?: SchemaFiledType;
};
