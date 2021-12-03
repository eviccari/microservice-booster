const { ROOT_FOLDER } = require("../../configs/system-config");
const DirectoryBuilder = require("../../services/resource-builders/directory-builder");

class ProjectDirectoryBuilder {
  /**
   * Default constructor to build folders in based on chain of resource names
   * @param projectName
   * @param chain
   */
  constructor(projectName, chain) {
    if (!projectName || projectName.length === 0)
      throw new Error("Project name is required");

    if (!chain || chain.length === 0)
      throw new Error("Chain of resource names is required");

    this.chain = chain;
    this.chain.unshift(projectName);
    this.chain.unshift(ROOT_FOLDER);
  }

  /**
   * Build project directories and return absolute path
   */
  build() {
    return DirectoryBuilder.build(this.chain);
  }
}

module.exports = ProjectDirectoryBuilder;
