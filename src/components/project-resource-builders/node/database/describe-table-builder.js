const ProjectFileBuilder = require("../../project-file-builder");
const DescribeTableTemplate = require("../../../../templates/node/database/describe-table-template");

class DescribeTableBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super("describe-table", configSource, "js", DescribeTableTemplate);
  }
}

module.exports = DescribeTableBuilder;
