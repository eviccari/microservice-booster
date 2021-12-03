const ProjectFileBuilder = require("../../project-file-builder");
const EntityServiceTemplate = require("../../../../templates/node/services/entity-service-template");
const { replaceAll, downCase } = require("../../../../utils/string-utils");
class EntityServiceBuilder extends ProjectFileBuilder {
  constructor(configSource, entityName) {
    super(
      "entity",
      configSource,
      "js",
      replaceAll(EntityServiceTemplate, "__ENTITY_NAME__", downCase(entityName))
    );
  }
}

module.exports = EntityServiceBuilder;
