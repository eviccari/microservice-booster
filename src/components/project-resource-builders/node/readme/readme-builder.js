const ProjectFileBuilder = require("../../project-file-builder");
const ReadmeTemplate = require("../../../../templates/node/readme/readme-template");
const { ROOT_FOLDER, SEPARATOR } = require("../../../../configs/system-config");
const { replaceAll } = require("../../../../utils/string-utils");

class ReadmeBuilder extends ProjectFileBuilder {
  /**
   * Default constructor to create .env
   * @param {string} destination
   */
  constructor(projectConfiguration) {
    super(
      "README",
      `${ROOT_FOLDER}${SEPARATOR}${projectConfiguration.projectName}`,
      "md",
      replaceAll(
        replaceAll(
          ReadmeTemplate,
          "__PROJECT_NAME__",
          projectConfiguration.projectName.toUpperCase()
        ),
        "__PROJECT_DESCRIPTION__",
        projectConfiguration.desc
      )
    );
  }
}

module.exports = ReadmeBuilder;
