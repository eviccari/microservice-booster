const ProjectFileBuilder = require("../../project-file-builder");
const DeadLetterQueueServiceTemplate = require("../../../../templates/node/services/dead-letter-queue-service-template");

class DeadLetterQueueServiceBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super(
      "dead-letter-queue",
      configSource,
      "js",
      DeadLetterQueueServiceTemplate
    );
  }
}

module.exports = DeadLetterQueueServiceBuilder;
