const ProjectFileBuilder = require("../../project-file-builder");
const KafkaConfigTemplate = require("../../../../templates/node/configs/kafka-template");

class KafkaConfigBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super("kafka", configSource, "js", KafkaConfigTemplate);
  }
}

module.exports = KafkaConfigBuilder;
