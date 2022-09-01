import * as yup from 'yup';
import type { ValidationSchemaType } from './typesSchemes';

const patchUserInfoSchema: ValidationSchemaType = {
  body: {
    fullName: yup.string(),
    email: yup.string().email().required(),
  },
};

export default patchUserInfoSchema;
