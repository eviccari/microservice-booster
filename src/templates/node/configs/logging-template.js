const stringUtils = require("../../../utils/string-utils");

module.exports =
  stringUtils.removeScapeStringTag(`const { createLogger, format, transports } = require(\"winston\");
const { combine, timestamp } = format;
const colorize = format.colorize();
const doColorize = process.env.COLORIZE_LOGS === \"true\";

let customFormat;

if (doColorize) {
  customFormat = format.printf((info) => {
    return colorize.colorize(
      info.level,
      \`$SCAPE_STRING_PARAM{info.timestamp} $SCAPE_STRING_PARAM{info.level}: $SCAPE_STRING_PARAM{info.message}\`
    );
  });
} else {
  customFormat = format.printf((info) => {
    return \`$SCAPE_STRING_PARAM{info.timestamp} $SCAPE_STRING_PARAM{info.level}: $SCAPE_STRING_PARAM{info.message}\`;
  });
}

const logger = createLogger({
  level: \"info\",
  format: combine(timestamp(), customFormat),
  defaultMeta: { service: \"user-service\" },
  transports: [new transports.Console()],
  exceptionHandlers: [new transports.Console()],
});

module.exports = function () {
  logger.exitOnError = false;

  process.on(\"unhandledRejection\", (ex) => {
    throw ex;
  });

  return logger;
};`);
