const ProjectFileBuilder = require("../../project-file-builder");
const KafkaConsumerTemplate = require("../../../../templates/node/services/kafka-consumer-template");

class KafkaConsumerBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super("kafka-consumer", configSource, "js", KafkaConsumerTemplate);
  }
}

module.exports = KafkaConsumerBuilder;
