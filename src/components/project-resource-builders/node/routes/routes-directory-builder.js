const ProjectDirectoryBuilder = require("../../project-directory-builder");

class RoutesDirectoryBuilder extends ProjectDirectoryBuilder {
  constructor(projectName) {
    super(projectName, ["src", "routes"]);
  }
}

module.exports = RoutesDirectoryBuilder;
