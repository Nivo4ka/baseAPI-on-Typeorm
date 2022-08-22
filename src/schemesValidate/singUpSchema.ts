// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as yup from 'yup';
import type { ValidationSchemaType } from './typesSchemes';

const singUpSchema: ValidationSchemaType = {
  body: {
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).matches(/^[a-zA-Z0-9-_]{8,}$/).required(),
    birthDay: yup.date().required(),
  },

};

export default singUpSchema;
