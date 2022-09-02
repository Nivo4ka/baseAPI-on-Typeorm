import * as yup from 'yup';
import type { ValidationSchemaType } from './typesSchemes';

const patchUserImgSchema: ValidationSchemaType = {
  body: {
    file: yup.string().required(),
  },
};

export default patchUserImgSchema;
