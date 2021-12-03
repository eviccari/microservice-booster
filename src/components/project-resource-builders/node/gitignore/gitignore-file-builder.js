const ProjectFileBuilder = require("../../project-file-builder");
const { ROOT_FOLDER, SEPARATOR } = require("../../../../configs/system-config");
const GitignoreTemplate = require("../../../../templates/node/gitignore/gitignore-template");

class GitignoreFileBuilder extends ProjectFileBuilder {
  constructor(projectName) {
    super(
      ".gitignore",
      `${ROOT_FOLDER}${SEPARATOR}${projectName}`,
      null,
      GitignoreTemplate
    );
    this.projectName = projectName;
  }
}

module.exports = GitignoreFileBuilder;
