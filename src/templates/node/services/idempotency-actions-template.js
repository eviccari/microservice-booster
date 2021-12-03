const { removeScapeStringTag } = require("../../../utils/string-utils");

module.exports = removeScapeStringTag(`class IdempotencyActions {
    static CREATE = \"CREATE\";
    static UPDATE = \"UPDATE\";
  }
  
  module.exports = IdempotencyActions;
  `);
