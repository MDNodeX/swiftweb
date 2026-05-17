export const handleError = (res, statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
