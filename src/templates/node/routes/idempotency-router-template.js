module.exports = `const express = require(\"express\");
const router = express.Router();
const Service = require(\"../services/idempotency\");
const service = new Service();
const logRequest = require(\"../middlewares/log-request\");

router.get(\"/getSimpleIdempotencyKey\", logRequest, (req, res) => {
  const result = service.getSimpleIdempotencyKey();
  res.status(200).json({ idempotencyKey: result });
});

module.exports = router;`;
