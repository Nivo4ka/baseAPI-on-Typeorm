import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import type { AnyObject, OptionalObjectSchema, TypeOfShape } from 'yup/lib/object';
import type { ValidationSchemaType, SchemaFiledType } from '../schemesValidate/typesSchemes';
import ApiError from '../error/ApiError';

interface ITemplateInt {
  path: string;
  field: string;
  message: string;
  name: string;
}

const createValidationMiddleware = (schema: ValidationSchemaType): Handler => {
  const validate: Handler = async (req, res, next) => {
    try {
      const tempSchema: Record<
      string,
      OptionalObjectSchema<SchemaFiledType, AnyObject, TypeOfShape<SchemaFiledType>>> = {};
      Object.entries(schema).forEach(([key, val]) => {
        tempSchema[key] = yup.object(val);
      });
      const yupSchema = yup.object().shape(tempSchema).noUnknown(false);
      await yupSchema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      }, { abortEarly: false });
      return next();
    } catch (err) {
      const errorInfo: ITemplateInt[] = [];
      if (err.inner) {
        err.inner.forEach((_elem: { path: string; message: string; name: string }) => {
          const qwer: ITemplateInt = {
            path: _elem.path.split('.')[0],
            field: _elem.path.split('.')[1],
            message: _elem.message,
            name: _elem.name,
          };
          errorInfo.push(qwer);
        });
      }

      return next(
        new ApiError({
          statusCode: StatusCodes.NOT_ACCEPTABLE,
          message: err.name,
          data: errorInfo,
        }),
      );
    }
  };

  return validate;
};

export default createValidationMiddleware;
