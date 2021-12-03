module.exports = `const kafka = require(\"../configs/kafka\");
const KafkaGetHeaders = require(\"kafkajs-get-headers\");
const groupId = process.env.KAFKA_GROUP_ID;
const topic = process.env.KAFKA_TOPIC_NAME;
const logger = require(\"../configs/logging\")();
const ErrorMessageDto = require(\"../models/error-message-dto\");
const DeadLetterQueue = require(\"../services/dead-letter-queue\");

class KafkaConsumer {
    /**
     * To start kafka topic consumer
     * @returns {Promise<void>}
     */
    async startConsumer() {
        const consumer = kafka.consumer({ groupId: groupId });

        await consumer.connect();
        await consumer.subscribe({
            topic,
            fromBeginning: true,
        });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const getHeaders = new KafkaGetHeaders(message);

                let idempotencyKey = getHeaders.get(\"idempotencyKey\").asString();
                let observableId = getHeaders.get(\"observableId\").asString();
                let eventType = getHeaders.get(\"eventType\").asString();
                let body = {};
                let key = \"\";

                try {
                    idempotencyKey = idempotencyKey ? idempotencyKey : \"NA\";
                    observableId = observableId ? observableId : \"NA\";
                    eventType = eventType ? eventType : \"NA\";

                    logger.info(
                        \`MESSAGE_INBOUND|TOPIC:$SCAPE_STRING_PARAM{topic}|PARTITION:$SCAPE_STRING_PARAM{partition}|OBSERVABLE_ID:$SCAPE_STRING_PARAM{observableId}|EVENT_TYPE:$SCAPE_STRING_PARAM{eventType}\`
                    );

                    key = message.key.toString();
                    body = JSON.parse(message.value.toString());
                    
                    /*
                    #######################################################################
                    #################### CODE YOUR BUSINESS LOGIC HERE ####################
                    #######################################################################
                    */
                    console.info(json);

                } catch (error) {
                    logger.error(
                        \`MESSAGE_KEY:$SCAPE_STRING_PARAM{key}|IDEMPOTENCY_KEY:$SCAPE_STRING_PARAM{idempotencyKey}|OBSERVABLE_ID:$SCAPE_STRING_PARAM{observableId}|WITH_ERROR:$SCAPE_STRING_PARAM{error.message}\`
                    );

                    const formattedMessage = new ErrorMessageDto(
                        idempotencyKey,
                        observableId,
                        key,
                        eventType,
                        JSON.stringify(body),
                        error.message
                    ).build();

                    if (error._httpStatus !== 500) {
                        // business validation error cannot retry
                        await new DeadLetterQueue().sendToDLQ(formattedMessage);
                        logger.warn(
                            \`SEND_TO_DLQ|OBSERVABLE_ID:$SCAPE_STRING_PARAM{observableId}|IDEMPOTENCY_KEY:$SCAPE_STRING_PARAM{idempotencyKey}\`);
                    } else {
                        throw new Error(JSON.stringify(formattedMessage));
                    }
                }
            },
        });
    }

    /**
     * Start process
     */
    start() {
        this.startConsumer()
            .then((r) => logger.info(r))
            .catch((error) => {
                logger.error(error);
                process.exit(1);
            });
    }
}

module.exports = KafkaConsumer;`;
