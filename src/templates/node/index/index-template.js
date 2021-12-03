const stringUtils = require("../../../utils/string-utils");

module.exports =
  stringUtils.removeScapeStringTag(`const app = require(\"express\")();
require(\"./configs/startup\")(app);
const PORT = process.env.DEFAULT_PORT || 3000;
const logger = require(\"./configs/logging\")();
const TABLE_NAME = require("./table-name");

logger.info(\`NODE_ENV: $SCAPE_STRING_PARAM{process.env.NODE_ENV}\`);
logger.info(\`COLORIZE_LOGS: $SCAPE_STRING_PARAM{process.env.COLORIZE_LOGS}\`);
logger.info(\`DEFAULT_PORT: $SCAPE_STRING_PARAM{process.env.DEFAULT_PORT}\`);
logger.info(\`TABLE_NAME: $SCAPE_STRING_PARAM{TABLE_NAME}\`);
logger.info(\`TIME_TO_LIVE_IN_DAYS: $SCAPE_STRING_PARAM{process.env.TIME_TO_LIVE_IN_DAYS}\`);
logger.info(\`IDEMPOTENCY_MASK: $SCAPE_STRING_PARAM{process.env.IDEMPOTENCY_MASK}\`);

app.listen(PORT, () => {
  logger.info(\`Server is running on port $SCAPE_STRING_PARAM{PORT}\`);
});`);
