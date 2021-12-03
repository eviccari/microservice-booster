module.exports = `const express = require(\"express\");
const router = express.Router();
const Service = require(\"../services/entity\");
const service = new Service();
const logRequest = require(\"../middlewares/log-request\");

router.post(\"/\", logRequest, async (req, res) => {
  const { body, headers } = req;

  body.idempotencyKey = headers[\"idempotency-key\"];
  body.observableId = headers[\"observable-id\"];

  const result = await service.create(body);
  res.status(201).json(result);
});

router.patch(\"/\", logRequest, async (req, res) => {
  const { body, headers } = req;

  body.idempotencyKey = headers[\"idempotency-key\"];
  body.observableId = headers[\"observable-id\"];

  const result = await service.update(body);
  res.status(201).json(result);
});

router.get(\"/pk/:PK/sk/:SK\", logRequest, async (req, res) => {
  const { PK, SK } = req.params;
  const result = await service.findByUnique(PK, SK);

  if (req.query.formatted) {
    service.formatDates(result);
  }

  res.status(200).json(result);
});

router.get(\"/pk/:PK\", logRequest, async (req, res) => {
  const { PK } = req.params;
  const result = await service.findByPk(PK);

  res.status(200).json(result);
});

router.delete(\"/pk/:PK/sk/:SK\", logRequest, async (req, res) => {
  const { PK, SK } = req.params;
  await service.delete(PK, SK);

  return res.status(200).json({ message: \"deleted\" });
});

module.exports = router;`;
