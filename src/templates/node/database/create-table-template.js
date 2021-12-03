const stringUtils = require("../../../utils/string-utils");

module.exports =
  stringUtils.removeScapeStringTag(`const AWS = require(\"../configs/aws-config\");
const logger = require(\"../configs/logging\")();

class CreateTable {
  constructor() {
    this.dynamodb = new AWS.DynamoDB();
  }

  create(tableName) {
    let configuration = {
      TableName: tableName,
      KeySchema: [
        { AttributeName: \"PK\", KeyType: \"HASH\" },
        { AttributeName: \"SK\", KeyType: \"RANGE\" },
      ],
      AttributeDefinitions: [
        { AttributeName: \"PK\", AttributeType: \"S\" },
        { AttributeName: \"SK\", AttributeType: \"S\" },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 20,
        WriteCapacityUnits: 40,
      },
    };

    logger.info(
      \`Create table with configuration \n\n$SCAPE_STRING_PARAM{JSON.stringify(configuration)}\`
    );

    return new Promise((resolve, reject) => {
      this.dynamodb.createTable(configuration, (error, data) => {
        if (error) {
          reject(error);
        } else {
          const { TableDescription } = data;
          logger.info(
            \`Table $SCAPE_STRING_PARAM{TableDescription.TableName} with ID $SCAPE_STRING_PARAM{TableDescription.TableId} with Arn $SCAPE_STRING_PARAM{TableDescription.TableArn} crated!\`
          );

          resolve(TableDescription);
        }
      });
    });
  }
}

module.exports = CreateTable;`);
