const ProjectFileBuilder = require("../../project-file-builder");
const SimpleValidationTemplate = require("../../../../templates/node/services/simple-validation-template");

class SimpleValidationBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super("simple-validation", configSource, "js", SimpleValidationTemplate);
  }
}

module.exports = SimpleValidationBuilder;
