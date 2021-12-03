const ProjectFileBuilder = require("../../project-file-builder");
const TableNameTemplate = require("../../../../templates/node/database/table-name-template");
const { replaceAll } = require("../../../../utils/string-utils");

class TableNameBuilder extends ProjectFileBuilder {
  constructor(configSource, tableName) {
    super(
      "table-name",
      configSource,
      "js",
      replaceAll(TableNameTemplate, "__TABLE_NAME__", tableName)
    );
  }
}

module.exports = TableNameBuilder;
