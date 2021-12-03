module.exports = `const DbMigration = require(\"./db-migration\");
const TABLE_NAME = require("./table-name");

module.exports = async () => {
  await new DbMigration().migrate(TABLE_NAME);
};`;
