const {
  errorF
} = require('../utils/message');
const httpStatus = require('http-status');


const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    errorF(error.message, error, httpStatus.INTERNAL_SERVER_ERROR, res, next);
  });
};

module.exports = catchAsync;