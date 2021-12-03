const ProjectDirectoryBuilder = require("../../project-directory-builder");

class SrcDirectoryBuilder extends ProjectDirectoryBuilder {
  constructor(projectName) {
    super(projectName, ["src"]);
  }
}

module.exports = SrcDirectoryBuilder;
