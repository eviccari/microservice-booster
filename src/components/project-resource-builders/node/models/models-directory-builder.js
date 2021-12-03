const ProjectDirectoryBuilder = require("../../project-directory-builder");

class ModelsDirectoryBuilder extends ProjectDirectoryBuilder {
  constructor(projectName) {
    super(projectName, ["src", "models"]);
  }
}

module.exports = ModelsDirectoryBuilder;
