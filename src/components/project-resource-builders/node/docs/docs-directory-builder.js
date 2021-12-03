const ProjectDirectoryBuilder = require("../../project-directory-builder");

class DocsDirectoryBuilder extends ProjectDirectoryBuilder {
  constructor(projectName) {
    super(projectName, ["src", "docs"]);
  }
}

module.exports = DocsDirectoryBuilder;
