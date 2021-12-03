const ProjectFileBuilder = require("../../project-file-builder");
const RepositoryTemplate = require("../../../../templates/node/repository/repository-template");

class RepositoryBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super("repository", configSource, "js", RepositoryTemplate);
  }
}

module.exports = RepositoryBuilder;
