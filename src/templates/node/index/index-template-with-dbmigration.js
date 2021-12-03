const stringUtils = require("../../../utils/string-utils");

module.exports = stringUtils.removeScapeStringTag(
  `const app = require(\"express\")();
require(\"./configs/startup\")(app);
const dbMigrate = require(\"./database/migrate\");
const PORT = process.env.DEFAULT_PORT || 3000;
const logger = require(\"./configs/logging\")();

logger.info(\`NODE_ENV: $SCAPE_STRING_PARAM{process.env.NODE_ENV}\`);
logger.info(\`COLORIZE_LOGS: $SCAPE_STRING_PARAM{process.env.COLORIZE_LOGS}\`);
logger.info(\`DEFAULT_PORT: $SCAPE_STRING_PARAM{process.env.DEFAULT_PORT}\`);
logger.info(\`TABLE_NAME: $SCAPE_STRING_PARAM{process.env.TABLE_NAME}\`);
logger.info(\`TIME_TO_LIVE_IN_DAYS: $SCAPE_STRING_PARAM{process.env.TIME_TO_LIVE_IN_DAYS}\`);
logger.info(\`IDEMPOTENCY_MASK: $SCAPE_STRING_PARAM{process.env.IDEMPOTENCY_MASK}\`);

dbMigrate()
  .then(() => {
    logger.info("DATABASE MIGRATION OK!");

    app.listen(PORT, () => {
      logger.info(\`SERVER RUNNING ON PORT $SCAPE_STRING_PARAM{PORT}\`);
    });
  })
  .catch((error) => {
    logger.error(error.message);
    process.exit(1);
  });`
);
