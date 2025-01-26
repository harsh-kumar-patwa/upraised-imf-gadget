const { StatusCodes } = require('http-status-codes');

function errorHandler(err, req, res, next) {
  console.error(err.stack);

  const response = {
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message || 'Unexpected error occurred',
      timestamp: new Date().toISOString(),
      path: req.originalUrl
    }
  };

  if (process.env.NODE_ENV === 'development') {
    response.error.stack = err.stack;
  }

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json(response);
}

module.exports = errorHandler;