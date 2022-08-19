import type * as yup from 'yup';
import { ValidateOptions } from 'yup/lib/types';
// eslint-disable-next-line max-len
export type SchemaFiledType = yup.StringSchema | yup.DateSchema | yup.NumberSchema | string | number | object;

export type ValidationSchemaItemType = Record<string, SchemaFiledType>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ValidationSchemaType = {
  validate(arg0: { body: any; query: import("qs").ParsedQs; params: import("express-serve-static-core").ParamsDictionary; }, arg1: { abortEarly: boolean; })?:Validate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: ValidationSchemaItemType;
  query?: ValidationSchemaItemType;
  params?: ValidationSchemaItemType;
};
