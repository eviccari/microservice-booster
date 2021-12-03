const ProjectFileBuilder = require("../../project-file-builder");
const CorsTemplate = require("../../../../templates/node/configs/cors-template");

class CorsBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super("cors", configSource, "js", CorsTemplate);
  }
}

module.exports = CorsBuilder;
