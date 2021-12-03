const ProjectFileBuilder = require("../../project-file-builder");
const IndexTemplate = require("../../../../templates/node/index/index-template");
const IndexTemplateWithDbMigration = require("../../../../templates/node/index/index-template-with-dbmigration");

class IndexJsBuilder extends ProjectFileBuilder {
  /**
   * Default constructor to create index.js
   * @param {string} destination
   * @param {boolean} withDbMigration
   */
  constructor(destination, withDbMigration) {
    super(
      "index",
      destination,
      "js",
      withDbMigration ? IndexTemplateWithDbMigration : IndexTemplate
    );
  }
}

module.exports = IndexJsBuilder;
