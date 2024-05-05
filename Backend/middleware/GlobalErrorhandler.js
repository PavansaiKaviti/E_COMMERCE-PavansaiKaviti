const GolbalErrorHandler = (err, req, res, next) => {
  const message = err.message;
  const stack = err.stack;
  const status = err.status ? err.status : "failed";
  const statusCode = err.statusCode ? err.statusCode : 500;
  return res.status(statusCode).json({
    status,
    message,
    stack,
  });
};

module.exports = GolbalErrorHandler;
