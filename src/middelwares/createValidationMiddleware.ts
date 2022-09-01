import type { Handler } from 'express';
import * as yup from 'yup';
import type { ValidationSchemaType, SchemaFiledType } from '../schemesValidate/typesSchemes';
import { validationError } from '../utils/errorHalper';

export interface ITemplateInt {
  path: string;
  field: string;
  message: string;
  name: string;
}

const createValidationMiddleware = (schema: ValidationSchemaType): Handler => {
  const validate: Handler = async (req, res, next) => {
    try {
      const wrappedSchema = yup.object().shape(
        Object.entries(schema).reduce((acc, [key, value]) => {
          return {
            ...acc,
            [key]: yup.object().noUnknown(true).shape(value),
          };
        }, {} as Record<string, yup.ObjectSchema<SchemaFiledType>>),
      );

      await wrappedSchema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      }, { abortEarly: false, strict: true });

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
        validationError(err.name, errorInfo),
      );
    }
  };

  return validate;
};

export default createValidationMiddleware;
