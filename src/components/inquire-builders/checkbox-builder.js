const InquireBuilder = require("./inquire-builder");
const TYPE = "checkbox";

class CheckboxBuilder extends InquireBuilder {
  /**
   * Default constructor
   * @param name {string}
   * @param message {string}
   * @param choices {Array[{string, string}]}
   */
  constructor(name, message, choices) {
    super([
      {
        type: TYPE,
        message: message,
        name: name,
        choices: choices,
        validate(answer) {
          if (answer.length < 1) {
            return "You must choose at least one";
          }
          return true;
        },
      },
    ]);
  }
}

module.exports = CheckboxBuilder;
