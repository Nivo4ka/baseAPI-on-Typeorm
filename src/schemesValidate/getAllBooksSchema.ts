import * as yup from 'yup';
import type { ValidationSchemaType } from './typesSchemes';

const getAllBooksSchema: ValidationSchemaType = {
  body: {
  },
  query: {
    page: yup.string(),
    pageSize: yup.string(),
    sortBy: yup.string().required(),
    direction: yup.string().matches(/(asc|desc)/).required(),
    search: yup.string(),
    genres: yup.string(),
    minPrice: yup.string().required(),
    maxPrice: yup.string().required(),
  },
  params: {
  },
};

export default getAllBooksSchema;
