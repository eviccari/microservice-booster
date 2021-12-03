const ProjectFileBuilder = require("../../project-file-builder");
const SwaggerTemplate = require("../../../../templates/node/docs/swagger-template");

class SwaggerBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super("swagger", configSource, "js", SwaggerTemplate);
  }
}

module.exports = SwaggerBuilder;
