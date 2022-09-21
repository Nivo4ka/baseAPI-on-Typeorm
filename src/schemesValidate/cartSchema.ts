import * as yup from 'yup';
import type { ValidationSchemaType } from './typesSchemes';

const cartSchema: ValidationSchemaType = {
  params: {
    bookId: yup.string().required(),
  },
  body: {
    count: yup.number(),
  },
};

export default cartSchema;
