class BadRequestError extends Error {
  constructor(message: string, statusCodes: number = 400) {
    super(message);
    statusCodes;
  }
}

export default BadRequestError;
