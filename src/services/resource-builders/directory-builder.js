const fs = require("fs");
const SEPARATOR = require("path").sep;

class DirectoryBuilder {
  /**
   * Build directories
   * @param {Array[string]} chain
   */
  static build(chain) {
    let absolutePath = "";

    chain.forEach((directoryName) => {
      absolutePath += directoryName + SEPARATOR;

      if (!fs.existsSync(absolutePath)) {
        fs.mkdirSync(absolutePath);
      }
    });

    return absolutePath;
  }
}

module.exports = DirectoryBuilder;
