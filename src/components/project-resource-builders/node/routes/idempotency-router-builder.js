const ProjectFileBuilder = require("../../project-file-builder");
const IdempotencyRouterTemplate = require("../../../../templates/node/routes/idempotency-router-template");

class IdempotencyRouterBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super("idempotency", configSource, "js", IdempotencyRouterTemplate);
  }
}

module.exports = IdempotencyRouterBuilder;
