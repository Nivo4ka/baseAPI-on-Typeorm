import * as yup from 'yup';
import type { ValidationSchemaType } from './typesSchemes';

const patchUserPasswordSchema: ValidationSchemaType = {
  body: {
    password: yup.string().required(),
    newPassword: yup.string()
      .min(8)
      .matches(/^[a-zA-Z0-9-_]{8,}$/)
      .notOneOf([yup.ref('password')])
      .required(),
    repeatNewPassword: yup.string()
      .oneOf([yup.ref('newPassword')])
      .required(),
  },
};

export default patchUserPasswordSchema;
