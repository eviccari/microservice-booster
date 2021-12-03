const ProjectDirectoryBuilder = require("../../project-directory-builder");

class ServicesDirectoryBuilder extends ProjectDirectoryBuilder {
  constructor(projectName) {
    super(projectName, ["src", "services"]);
  }
}

module.exports = ServicesDirectoryBuilder;
