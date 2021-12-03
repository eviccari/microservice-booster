const ProjectDirectoryBuilder = require("../../project-directory-builder");

class MiddlewaresDirectoryBuilder extends ProjectDirectoryBuilder {
  constructor(projectName) {
    super(projectName, ["src", "middlewares"]);
  }
}

module.exports = MiddlewaresDirectoryBuilder;
