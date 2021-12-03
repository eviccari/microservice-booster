const ProjectFileBuilder = require("../../project-file-builder");
const EntityModelTemplate = require("../../../../templates/node/models/entity-model-template");
const StringUtils = require("../../../../utils/string-utils");

class EntityModelBuilder extends ProjectFileBuilder {
  constructor(configSource, entityName) {
    super(
      StringUtils.downCase(entityName),
      configSource,
      "js",
      StringUtils.replaceAll(
        EntityModelTemplate,
        "__ENTITY_NAME__",
        StringUtils.capitalize(entityName)
      )
    );
  }
}

module.exports = EntityModelBuilder;
