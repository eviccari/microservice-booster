const stringUtils = require("../../../utils/string-utils");

module.exports =
  stringUtils.removeScapeStringTag(`const AWS = require(\"../configs/aws-config\");
const logger = require(\"../configs/logging\")();

class UpdateTimeToLive {
  constructor() {
    this.dynamodb = new AWS.DynamoDB();
  }

  update(tableName) {
    const configuration = {
      TableName: tableName,
      TimeToLiveSpecification: {
        AttributeName: \"ttl\",
        Enabled: true,
      },
    };

    return new Promise((resolve, reject) => {
      this.dynamodb.updateTimeToLive(configuration, (error, data) => {
        if (error) {
          reject(error);
        } else {
          logger.info(\`$SCAPE_STRING_PARAM{JSON.stringify(data)}\`);
          resolve(true);
        }
      });
    });
  }
}

module.exports = UpdateTimeToLive;`);
