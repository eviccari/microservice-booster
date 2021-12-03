module.exports = `const logger = require("../configs/logging")();
const CreateTable = require(\"./create-table\");
const DescribeTable = require(\"./describe-table\");
const UpdateTTL = require(\"./update-time-to-live\");

class DbMigration {
  constructor() {}

  async migrate(tableName) {
    try {
      const table = await new DescribeTable().describe(tableName);

      if (!table) {
        await new CreateTable().create(tableName);
        await new UpdateTTL().update(tableName);
      }
    } catch (error) {
      logger.error(error.message);
      throw new Error(error.message);
    }
  }
}

module.exports = DbMigration;`;
