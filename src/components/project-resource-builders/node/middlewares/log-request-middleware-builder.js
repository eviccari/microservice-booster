const ProjectFileBuilder = require("../../project-file-builder");
const LogRequestTemplate = require("../../../../templates/node/middlewares/log-request-template");

class LogRequestMiddlewareBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super("log-request", configSource, "js", LogRequestTemplate);
  }
}

module.exports = LogRequestMiddlewareBuilder;
