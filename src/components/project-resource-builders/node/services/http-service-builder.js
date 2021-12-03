const ProjectFileBuilder = require("../../project-file-builder");
const HttpServiceTemplate = require("../../../../templates/node/services/http-service-template");

class HttpServiceBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super("http", configSource, "js", HttpServiceTemplate);
  }
}

module.exports = HttpServiceBuilder;
