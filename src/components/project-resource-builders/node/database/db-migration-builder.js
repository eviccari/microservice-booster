const ProjectFileBuilder = require("../../project-file-builder");
const DbMigrationTemplate = require("../../../../templates/node/database/db-migration-template");

class DbMigrationBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super("db-migration", configSource, "js", DbMigrationTemplate);
  }
}

module.exports = DbMigrationBuilder;
