const stringUtils = require("../../../utils/string-utils");

module.exports =
  stringUtils.removeScapeStringTag(`const logger = require(\"../configs/logging\")();

module.exports = function (req, res, next) {
  if (process.env.NODE_ENV !== \"production\")
    logger.info(\`url: $SCAPE_STRING_PARAM{req.url} method: $SCAPE_STRING_PARAM{req.method}\`);
  next();
};`);
