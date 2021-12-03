const ProjectFileBuilder = require("../../project-file-builder");
const ErrorMessageDtoTemplate = require("../../../../templates/node/models/error-message-dto-template");

class ErrorMessageDtoBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super("error-message-dto", configSource, "js", ErrorMessageDtoTemplate);
  }
}

module.exports = ErrorMessageDtoBuilder;
