import * as yup from "yup";
import parse from "date-fns/parse";

export const changeSchema = yup.object({
  body: yup.object({
    fullName: yup.string(),
    birthDay: yup.date().transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, "yyyy-mm-dd", new Date());
      return result;
    }),
    userId: yup.string().required(),
    userEmail: yup.string().required(),
  }),
});