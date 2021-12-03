const InquireBuilder = require("./inquire-builder");
const TYPE = "input";

class InputBuilder extends InquireBuilder {
  /**
   * Default constructor for input inquirer
   * @param {string} name
   * @param {string} message
   * @param {string} defaultValue
   */
  constructor(name, message, defaultValue) {
    super([
      {
        type: TYPE,
        name: name,
        message: message,
        default() {
          return defaultValue;
        },
      },
    ]);
  }
}

module.exports = InputBuilder;
