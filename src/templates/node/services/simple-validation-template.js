module.exports = `class SimpleValidation {
  constructor() {}

  isEmpty(value) {
    return value === undefined || value === null;
  }
}

module.exports = SimpleValidation;`;
