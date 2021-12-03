const ProjectFileBuilder = require("../../project-file-builder");
const SimpleModelTemplate = require("../../../../templates/node/models/simple-model-template");

class SimpleModelBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super("simple-model", configSource, "js", SimpleModelTemplate);
  }
}

module.exports = SimpleModelBuilder;
