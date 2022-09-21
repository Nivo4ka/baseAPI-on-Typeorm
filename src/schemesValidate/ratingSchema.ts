import * as yup from 'yup';
import type { ValidationSchemaType } from './typesSchemes';

const ratingSchema: ValidationSchemaType = {
  params: {
    bookId: yup.string().required(),
  },
  body: {
    grade: yup.number().required(),
  },
};

export default ratingSchema;
