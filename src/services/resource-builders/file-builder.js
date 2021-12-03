const fs = require("fs");
const { SEPARATOR } = require("../../configs/system-config");

class FileBuilder {
  constructor() {}

  /**
   * Build file with params that have been send in default constructor
   * @param {string} destination
   * @param {string} name
   * @param {string} extension
   * @param {string} content
   */
  static build(destination, name, extension, content) {
    if (!destination) throw new Error("File destination is required");
    if (!name) throw new Error("File name is required");
    if (!content) throw new Error("File content is required");

    const path = extension
      ? `${destination}${SEPARATOR}${name}.${extension}`
      : `${destination}${SEPARATOR}${name}`;

    fs.writeFileSync(path, content);
  }
}

module.exports = FileBuilder;
