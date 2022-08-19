type ErrorPayloadType<D> = {
  statusCode: number;
  message: string;
  data?: D;
};

class ApiError<D> extends Error {
  payload: ErrorPayloadType<D>;

  constructor(payload: ErrorPayloadType<D>) {
    super(payload.message);

    this.payload = payload;
  }
}

export default ApiError;
