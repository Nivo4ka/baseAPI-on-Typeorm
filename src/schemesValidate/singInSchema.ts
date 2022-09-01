import * as yup from 'yup';
import type { ValidationSchemaType } from './typesSchemes';

const singInSchema: ValidationSchemaType = {
  body: {
    email: yup.string().email().required(),
    password: yup.string().min(8).matches(/^[a-zA-Z0-9-_]{8,}$/).required(),
    repeatPassword: yup.string(),
  },
};

export default singInSchema;
