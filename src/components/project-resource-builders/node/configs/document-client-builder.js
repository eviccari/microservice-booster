const ProjectFileBuilder = require("../../project-file-builder");
const DocumentClientTemplate = require("../../../../templates/node/configs/document-client-template");

class DocumentClientBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super("document-client", configSource, "js", DocumentClientTemplate);
  }
}

module.exports = DocumentClientBuilder;
