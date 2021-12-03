module.exports = `const AWS = require(\"aws-sdk\");

AWS.config.update({
  region: \"local\",
  endpoint: \"http://localhost:8000\",
});

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports = documentClient;`;
