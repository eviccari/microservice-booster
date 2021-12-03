const FileBuilder = require("../../services/resource-builders/file-builder");
const SimpleFileBuilder = require("./simple-file-builder");

class ProjectFileBuilder extends SimpleFileBuilder {
  constructor(filename, destination, extension, content) {
    super(filename, extension, destination);
    this.content = content;
  }

  build() {
    FileBuilder.build(
      this.destination,
      this.filename,
      this.extension,
      this.content
    );
  }
}

module.exports = ProjectFileBuilder;
