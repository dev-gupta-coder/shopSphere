class ApiError extends Error {
  constructor(
    statusCode,
    message
  ) {
    super(message);

    this.statusCode =
      statusCode;

    this.success = false;
  }
}

export default ApiError;

// ex  throw new ApiError(
//         404,
//         "Product not found"
//         );