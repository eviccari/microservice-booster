const ProjectFileBuilder = require("../../project-file-builder");
const DockerfileTemplate = require("../../../../templates/node/docker/dockerfile-template");
const { ROOT_FOLDER, SEPARATOR } = require("../../../../configs/system-config");

class DockerfileBuilder extends ProjectFileBuilder {
  /**
   * Default constructor to create .env
   * @param {string} destination
   */
  constructor(projectName) {
    super(
      "Dockerfile",
      `${ROOT_FOLDER}${SEPARATOR}${projectName}`,
      null,
      DockerfileTemplate
    );
  }
}

module.exports = DockerfileBuilder;
