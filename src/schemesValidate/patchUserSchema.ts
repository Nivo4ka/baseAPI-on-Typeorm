import * as yup from 'yup';
import type { ValidationSchemaType } from './typesSchemes';

const patchUserSchema: ValidationSchemaType = {
  body: {
    fullName: yup.string(),
    birthDay: yup.date(),
  },
};

export default patchUserSchema;
