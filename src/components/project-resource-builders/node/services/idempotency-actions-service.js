const ProjectFileBuilder = require("../../project-file-builder");
const IdempotencyActionsServiceTemplate = require("../../../../templates/node/services/idempotency-actions-template");

class IdempotencyActionsServiceBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super(
      "idempotency-actions",
      configSource,
      "js",
      IdempotencyActionsServiceTemplate
    );
  }
}

module.exports = IdempotencyActionsServiceBuilder;
