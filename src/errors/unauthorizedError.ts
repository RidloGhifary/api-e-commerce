class UnauthorizedError extends Error {
  constructor(message: string, statusCodes: number = 401) {
    super(message);
    statusCodes;
  }
}

export default UnauthorizedError;
