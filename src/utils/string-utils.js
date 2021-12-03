const _ = require("lodash");

class StringUtils {
  constructor() {}

  static removeScapeStringTag(value) {
    return _.replace(value, new RegExp("SCAPE_STRING_PARAM", "g"), "");
  }

  static replaceAll(stringBody, valueToReplace, replacement) {
    return _.replace(stringBody, new RegExp(valueToReplace, "g"), replacement);
  }

  static capitalize(text) {
    return _.capitalize(text);
  }

  static downCase(text) {
    return _.lowerCase(text);
  }

  static upperCase(text) {
    return _.upperCase(text);
  }
}

module.exports = StringUtils;
