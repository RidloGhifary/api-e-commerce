class ForbiddenError extends Error {
  constructor(message: string, statusCodes: number = 403) {
    super(message);
    statusCodes;
  }
}

export default ForbiddenError;
