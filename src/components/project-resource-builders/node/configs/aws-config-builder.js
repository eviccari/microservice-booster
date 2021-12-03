const ProjectFileBuilder = require("../../project-file-builder");
const AWSConfigTemplate = require("../../../../templates/node/configs/aws-config-template");

class AwsConfigBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super("aws-config", configSource, "js", AWSConfigTemplate);
  }
}

module.exports = AwsConfigBuilder;
