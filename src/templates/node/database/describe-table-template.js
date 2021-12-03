const stringUtils = require("../../../utils/string-utils");

module.exports =
  stringUtils.removeScapeStringTag(`const AWS = require(\"../configs/aws-config\");
const logger = require(\"../configs/logging\")();
class DescribeTable {
  constructor() {
    this.dynamodb = new AWS.DynamoDB();
  }

  describe(tableName) {
    const describeConfigurations = {
      TableName: tableName,
    };

    return new Promise((resolve, reject) => {
      this.dynamodb.describeTable(describeConfigurations, (error, data) => {
        if (error) {
          if (
            error.statusCode === 400 &&
            error.code === \"ResourceNotFoundException\"
          )
            resolve(false);
          else {
            reject(error);
          }
        } else {
          const { Table } = data;
          logger.info(\`DESCRIBE TABLE: $SCAPE_STRING_PARAM{JSON.stringify(Table)}\`);
          resolve(Table);
        }
      });
    });
  }
}

module.exports = DescribeTable;`);
