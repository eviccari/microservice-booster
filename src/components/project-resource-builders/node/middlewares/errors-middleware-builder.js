const ProjectFileBuilder = require("../../project-file-builder");
const ErrorsTemplate = require("../../../../templates/node/middlewares/errors-template");

class ErrorsMiddlewareBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super("errors", configSource, "js", ErrorsTemplate);
  }
}

module.exports = ErrorsMiddlewareBuilder;
