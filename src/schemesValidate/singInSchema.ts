import * as yup from 'yup';
import type { ValidationSchemaType } from './typesSchemes';

const singInSchema: ValidationSchemaType = {
  body: {
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  },
};

export default singInSchema;
