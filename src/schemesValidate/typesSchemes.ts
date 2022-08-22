import type * as yup from 'yup';

// eslint-disable-next-line max-len
export type SchemaFiledType = {
  [key: string]: yup.StringSchema | yup.DateSchema | yup.NumberSchema;
};

// eslint-disable-next-line max-len
// export type SchemaFiledType = yup.StringSchema | yup.DateSchema | yup.NumberSchema | string | number | object;

export type ValidationSchemaItemType = Record<string, SchemaFiledType>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ValidationSchemaType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: SchemaFiledType;
  query?: SchemaFiledType;
  params?: SchemaFiledType;
};
