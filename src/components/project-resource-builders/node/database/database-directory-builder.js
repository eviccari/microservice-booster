const ProjectDirectoryBuilder = require("../../project-directory-builder");

class DatabaseDirectoryBuilder extends ProjectDirectoryBuilder {
  constructor(projectName) {
    super(projectName, ["src", "database"]);
  }
}

module.exports = DatabaseDirectoryBuilder;
