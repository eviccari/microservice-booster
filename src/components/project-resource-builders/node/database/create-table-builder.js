const ProjectFileBuilder = require("../../project-file-builder");
const CreateTableTemplate = require("../../../../templates/node/database/create-table-template");

class CreateTableBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super("create-table", configSource, "js", CreateTableTemplate);
  }
}

module.exports = CreateTableBuilder;
