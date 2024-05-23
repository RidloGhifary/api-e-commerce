class NotFoundError extends Error {
  constructor(message: string, statusCodes: number = 404) {
    super(message);
    statusCodes = statusCodes;
  }
}

export default NotFoundError;
