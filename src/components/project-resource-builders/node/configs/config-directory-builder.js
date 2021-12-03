const ProjectDirectoryBuilder = require("../../project-directory-builder");

class ConfigDirectoryBuilder extends ProjectDirectoryBuilder {
  constructor(projectName) {
    super(projectName, ["src", "configs"]);
  }
}

module.exports = ConfigDirectoryBuilder;
