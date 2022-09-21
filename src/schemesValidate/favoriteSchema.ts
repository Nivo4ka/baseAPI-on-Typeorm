import * as yup from 'yup';
import type { ValidationSchemaType } from './typesSchemes';

const favoriteSchema: ValidationSchemaType = {
  params: {
    bookId: yup.string().required(),
  },
};

export default favoriteSchema;
