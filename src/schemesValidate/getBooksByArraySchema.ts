import * as yup from 'yup';
import type { ValidationSchemaType } from './typesSchemes';

const getBooksByArraySchema: ValidationSchemaType = {
  query: {
    bookIds: yup.string(),
  },
};

export default getBooksByArraySchema;
