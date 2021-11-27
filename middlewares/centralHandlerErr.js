const {
  handlerError,
} = require('../const/const');

const centralHandlerErr = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? handlerError
        : message,
    });
  next();
};

module.exports = centralHandlerErr;
