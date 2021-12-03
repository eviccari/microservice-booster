const stringUtils = require("../../../utils/string-utils");

module.exports =
  stringUtils.removeScapeStringTag(`const path = require(\"path\");
const logger = require(\"../configs/logging\")();

const swaggerAutogen = require(\"swagger-autogen\")();
const outputFile = path.join(__dirname, \"swagger_output.json\");
const endpoints = [path.join(__dirname, \"..\", \"index.js\")];

generate = async function () {
  await swaggerAutogen(outputFile, endpoints);
};

generate()
  .then((r) =>
    logger.info(
      \`Swagger document generated with success!$SCAPE_STRING_PARAM{r !== undefined ? r : \"\"}\`
    )
  )
  .catch((error) => logger.error(error));`);
