import * as yup from "yup";
export const infoSchema = yup.object({
  body: yup.object({
    userId: yup.string().required(),
    userEmail: yup.string().required(),
  }),
});