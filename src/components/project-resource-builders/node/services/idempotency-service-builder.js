const ProjectFileBuilder = require("../../project-file-builder");
const IdempotencyServiceTemplate = require("../../../../templates/node/services/idempotency-service-template");

class IdempotencyServiceBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super("idempotency", configSource, "js", IdempotencyServiceTemplate);
  }
}

module.exports = IdempotencyServiceBuilder;
