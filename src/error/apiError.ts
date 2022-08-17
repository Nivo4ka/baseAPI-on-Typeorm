export class ApiError extends Error {
  status: any;
  constructor(status, message) {
    super();
    this.status = status
    this.message = message
  }

  static forbidden(message) {
    return new ApiError(403, message)
  }//user already exist

  static forNotFound(message) {
    return new ApiError(404, message)
  }//user not found

  static forNotAuth(message) {
    return new ApiError(401, message)
  }//user not auth

  static forIncorrectValue(message) {
    return new ApiError(406, message)
  }//incorrent values

  static forRottenToken(message) {
    return new ApiError(412, message)
  }//rotten token

}
