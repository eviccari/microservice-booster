const stringUtils = require("../../../utils/string-utils");

module.exports =
  stringUtils.removeScapeStringTag(`const { Kafka, logLevel } = require(\"kafkajs\");
const logger = require(\"../configs/logging\")();

module.exports = new Kafka({
  logLevel: logLevel.NOTHING,
  brokers: [process.env.KAFKA_BROKER_1, process.env.KAFKA_BROKER_2],
  ssl: true,
  sasl: {
    mechanism: \"scram-sha-512\",
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
  },
  clientId: process.env.KAFKA_CLIENT_ID,
  retry: {
    maxRetryTime: 30000,
    initialRetryTime: 100,
    retries: 5,
    restartOnFailure: async (error) => {
      return new Promise((resolve, reject) => {
        const formattedMessage = JSON.parse(error.message);
        logger.warn(
          \`MESSAGE_WITH_ERROR:OBSERVABLE_ID:$SCAPE_STRING_PARAM{formattedMessage.observableId}|RETRY_COUNT:$SCAPE_STRING_PARAM{error.retryCount}|WITH_ERROR:$SCAPE_STRING_PARAM{formattedMessage.errorMessage}\`
        );
        resolve(true);
      });
    },
  },
});`);
