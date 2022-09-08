import * as yup from 'yup';
import type { ValidationSchemaType } from './typesSchemes';

const addBookSchema: ValidationSchemaType = {
  body: {
    title: yup.string().required(),
    autor: yup.string().required(),
    price: yup.number().required(),
    genre: yup.string().required(),
    description: yup.string(),
    cover: yup.string(),
  },
};

export default addBookSchema;
