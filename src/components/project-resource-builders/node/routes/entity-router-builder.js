const ProjectFileBuilder = require("../../project-file-builder");
const EntityRouterTemplate = require("../../../../templates/node/routes/entity-router-template");

class EntityRouterBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super("entity", configSource, "js", EntityRouterTemplate);
  }
}

module.exports = EntityRouterBuilder;
