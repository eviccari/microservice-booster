module.exports = `const Http = require(\"../services/http\");
const httpService = new Http();
const dlqTopic = process.env.KAFKA_DLQ_TOPIC_NAME;
const KafkaPayloadModel = require(\"../models/kafka-payload\");
const kafkaProducerUrl = process.env.KAFKA_PRODUCER_URL;

class DeadLetterQueue {
  constructor() {}

  /**
   * Send message with error to DLQ
   * @param errorMessageDto
   * @return {Promise<void>}
   */
  async sendToDLQ(errorMessageDto) {
    const payload = new KafkaPayloadModel().buildKafkaAPIMessageFromDto(
      errorMessageDto,
      dlqTopic
    );

    await httpService.post(
      kafkaProducerUrl,
      payload,
      httpService.getApplicationJsonHeader()
    );
  }
}

module.exports = DeadLetterQueue;`;
