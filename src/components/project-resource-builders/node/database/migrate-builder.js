const ProjectFileBuilder = require("../../project-file-builder");
const MigrateTemplate = require("../../../../templates/node/database/migrate-template");

class MigrateBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super("migrate", configSource, "js", MigrateTemplate);
  }
}

module.exports = MigrateBuilder;
