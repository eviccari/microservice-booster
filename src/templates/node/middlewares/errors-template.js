module.exports = `const logger = require(\"../configs/logging\")();
const SimpleModel = require(\"../models/simple-model\");
const model = new SimpleModel();

/**
 * To handle all errors that have been throw
 * @param error
 * @param req
 * @param res
 * @param next
 * @returns {response}
 */
module.exports = function (error, req, res, next) {
  const message = model.formatErrorMessage(error.message);

  if (error._httpStatus === 500) {
    logger.error(error.stack);
  } else {
    logger.error(message);
  }

  return res.status(error._httpStatus).json({
    message: message,
    errorType: error._httpStatus,
  });
};`;
