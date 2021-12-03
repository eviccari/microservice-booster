module.exports = `require(\"dotenv\").config();
require(\"express-async-errors\");
const express = require(\"express\");
const healthCheckRouter = require(\"../routes/health-check\");
const idempotencyRouter = require(\"../routes/idempotency\");
const errorMiddleware = require(\"../middlewares/errors\");
const cors = require(\"cors\");
const corsConfig = require(\"./cors\");
const swaggerUi = require(\"swagger-ui-express\");
const swaggerFile = require(\"../docs/swagger_output.json\");
__KAFKA_IMPORT__
__ENTITY_IMPORT__

module.exports = function (app) {
  app.use(cors(corsConfig));
  app.use(express.json());
  app.use(
    \"/docs\",
    swaggerUi.serve,
    swaggerUi.setup(swaggerFile, { explorer: true })
  );
  __ENTITY_ROUTER__
  app.use(\"/\", healthCheckRouter);
  app.use(\"/\", idempotencyRouter);
  app.use(errorMiddleware);
  __KAFKA_START__
};`;
