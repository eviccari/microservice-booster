const { ROOT_FOLDER, SEPARATOR } = require("../../configs/system-config");
const DirectoryBuilder = require("../../services/resource-builders/directory-builder");

class ProjectRootFolderBuilder {
  /**
   * Default constructor to create project root folder builder
   * @param {string} projectName
   */
  constructor(projectName) {
    if (!projectName) throw new Error("Project name is required");
    this.projectName = this.projectName;
  }

  build() {
    const rootFolder = ROOT_FOLDER + SEPARATOR + this.projectName;
    DirectoryBuilder.build([rootFolder]);
  }
}

module.exports = ProjectRootFolderBuilder;
