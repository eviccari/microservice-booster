module.exports = `const express = require(\"express\");
const router = express.Router();

router.get(\"/actuator/health\", (req, res) => {
  return res.status(200).json({ message: \"service_running\" });
});

module.exports = router;`;
