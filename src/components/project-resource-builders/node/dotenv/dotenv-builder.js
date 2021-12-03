const ProjectFileBuilder = require("../../project-file-builder");
const DotEnvTemplate = require("../../../../templates/node/dotenv/dot-env-template");
const { ROOT_FOLDER, SEPARATOR } = require("../../../../configs/system-config");

class DotenvBuilder extends ProjectFileBuilder {
  /**
   * Default constructor to create .env
   * @param {string} destination
   */
  constructor(projectName) {
    super(
      ".env",
      `${ROOT_FOLDER}${SEPARATOR}${projectName}`,
      "example",
      DotEnvTemplate
    );
  }
}

module.exports = DotenvBuilder;
