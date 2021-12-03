const ProjectFileBuilder = require("../../project-file-builder");
const LoggingTemplate = require("../../../../templates/node/configs/logging-template");

class LoggingBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super("logging", configSource, "js", LoggingTemplate);
  }
}

module.exports = LoggingBuilder;
