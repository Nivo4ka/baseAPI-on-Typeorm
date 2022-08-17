import { ApiError } from "../error/apiError";

export const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err) {
    return next(ApiError.forIncorrectValue("Одни из ниже перечисленных данных были введены не корректно: email, password, birthDay, fullName, userId, userEmail"));
  }
};