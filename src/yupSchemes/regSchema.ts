import * as yup from "yup";
import parse from "date-fns/parse";

export const regSchema = yup.object({
  body: yup.object({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    birthDay: yup.date().transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, "yyyy-mm-dd", new Date());
      return result;
    }).required(),
  }),
});