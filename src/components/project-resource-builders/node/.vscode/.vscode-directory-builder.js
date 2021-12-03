const ProjectDirectoryBuilder = require("../../project-directory-builder");

class VsCodeDirectoryBuilder extends ProjectDirectoryBuilder {
  constructor(projectName) {
    super(projectName, [".vscode"]);
  }
}

module.exports = VsCodeDirectoryBuilder;
