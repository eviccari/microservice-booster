const InquireBuilder = require("./inquire-builder");
const TYPE = "list";

class ListBuilder extends InquireBuilder {
  /**
   * Default constructor
   * @param {string} name
   * @param {string} message
   * @param {Array[string]} choices
   */
  constructor(name, message, choices) {
    super([
      {
        type: TYPE,
        name: name,
        message: message,
        choices: choices,
        validate(answer) {
          if (answer.length < 1) {
            return "You must choose at least one.";
          }

          return true;
        },
      },
    ]);
  }
}

module.exports = ListBuilder;
