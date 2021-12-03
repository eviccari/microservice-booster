const ProjectDirectoryBuilder = require("../../project-directory-builder");

class RepositoryDirectoryBuilder extends ProjectDirectoryBuilder {
  constructor(projectName) {
    super(projectName, ["src", "repository"]);
  }
}

module.exports = RepositoryDirectoryBuilder;
