import * as yup from 'yup';
import type { ValidationSchemaType } from './typesSchemes';

const getBookByIdSchema: ValidationSchemaType = {
  params: {
    bookId: yup.string().required(),
  },
};

export default getBookByIdSchema;
