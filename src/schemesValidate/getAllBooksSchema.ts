import * as yup from 'yup';
import type { ValidationSchemaType } from './typesSchemes';

const getAllBooksSchema: ValidationSchemaType = {
  body: {
  },
  query: {
    page: yup.string(),
    pageSize: yup.string(),
    sortBy: yup.string().oneOf(['price', 'title', 'autor', 'ratings']),
    direction: yup.string().oneOf(['ASC', 'DESC']),
    search: yup.string(),
    genres: yup.string(),
    minPrice: yup.string(),
    maxPrice: yup.string(),
  },
  params: {
  },
};

export default getAllBooksSchema;
