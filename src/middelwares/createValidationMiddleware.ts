import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
// import type schema from 'yup/lib/schema';
import type { ValidationSchemaType } from '../schemesValidate/typesSchemes';
import ApiError from '../error/ApiError';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface TemplateInt {
  path: string;
  field: string;
  message: string;
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createValidationMiddleware = (schema: ValidationSchemaType): Handler => {
  const validate: Handler = async (req, res, next) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      }, { abortEarly: false });
      return next();
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const errorInfo: TemplateInt[] = [];
      // eslint-disable-next-line array-callback-return, @typescript-eslint/no-unused-vars
      if (err.inner) {
        err.inner.forEach((_elem: { path: string; message: string; name: string }) => {
          const qwer: TemplateInt = {
            path: _elem.path.split('.')[0],
            field: _elem.path.split('.')[1],
            message: _elem.message,
            name: _elem.name,
          };
          errorInfo.push(qwer);
        });
      }

      // eslint-disable-next-line max-len
      return next(new ApiError({ statusCode: StatusCodes.NOT_ACCEPTABLE, message: err.name, data: errorInfo }));
    }
  };

  return validate;
};

export default createValidationMiddleware;
