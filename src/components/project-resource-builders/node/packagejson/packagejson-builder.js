const SimpleFileBuilder = require("../../simple-file-builder");
const PackageJsonTemplate = require("../../../../templates/node/packagejson/packagejson-template");
const { ROOT_FOLDER, SEPARATOR } = require("../../../../configs/system-config");
const FileBuilder = require("../../../../services/resource-builders/file-builder");
const { replaceAll } = require("../../../../utils/string-utils");

class PackageJsonBuilder extends SimpleFileBuilder {
  constructor(projectConfiguration) {
    super(
      "package",
      "json",
      `${ROOT_FOLDER}${SEPARATOR}${projectConfiguration.projectName}`
    );
    this.projectConfiguration = projectConfiguration;
  }

  build() {
    const { projectName, version, author, desc, purposes } =
      this.projectConfiguration;

    let content = PackageJsonTemplate;

    content = replaceAll(content, "__PROJECT_NAME__", projectName);
    content = replaceAll(content, "__PROJECT_VERSION__", version);
    content = replaceAll(content, "__PROJECT_DESCRIPTION__", desc);
    content = replaceAll(content, "__PROJECT_AUTHOR__", author);

    let anotherDependencies = "";

    if (purposes.includes("REST API")) {
      anotherDependencies += '\n    "aws-sdk": "^2.1012.0"';
    }

    if (
      purposes.includes("kafka producer") ||
      purposes.includes("kafka consumer")
    ) {
      anotherDependencies += anotherDependencies !== "" ? "," : "";
      anotherDependencies += '\n    "kafkajs": "^1.15.0",';
      anotherDependencies += '\n    "kafkajs-get-headers": "^1.0.1"';
    }

    content = replaceAll(
      content,
      "__ANOTHER_DEPENDENCIES__",
      anotherDependencies
    );

    return FileBuilder.build(
      this.destination,
      this.filename,
      this.extension,
      content
    );
  }
}

module.exports = PackageJsonBuilder;
