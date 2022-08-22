import type * as yup from 'yup';

export type SchemaFiledType = {
  [key: string]: yup.StringSchema | yup.DateSchema | yup.NumberSchema;
};

export type ValidationSchemaItemType = Record<string, SchemaFiledType>;

export type ValidationSchemaType = {
  body?: SchemaFiledType;
  query?: SchemaFiledType;
  params?: SchemaFiledType;
};
