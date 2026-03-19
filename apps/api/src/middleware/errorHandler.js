function errorHandler(err, req, res, next) {
  console.error(err);

  const isZodError = err.name === 'ZodError';
  const status = isZodError ? 400 : (err.status || 500);
  const message = isZodError
    ? (err.errors?.[0]?.message || err.message)
    : (err.message || 'Internal server error');

  res.status(status).json({
    error: message,
    ...(err.details && { details: err.details }),
  });
}

module.exports = errorHandler;
