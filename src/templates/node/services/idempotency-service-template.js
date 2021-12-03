module.exports = `const crypto = require(\"crypto\");

class Idempotency {
  constructor() {}

  /**
   * Create a simple idempotency key calculated by current timestamp salted by random numbers
   * @return {string}
   */
  getSimpleIdempotencyKey() {
    const date = new Date().valueOf().toString();

    return crypto
      .createHash(\"sha1\")
      .update(date + Math.random().toString())
      .digest(\"hex\");
  }
  
  /**
   * Build idempotency body to registry critical events
   * @param PK {string}
   * @param action {string}
   * @param idempotencyKey {string}
   * @return {Object}
   */
  buildIdempotencyBody(PK, action, idempotencyKey) {
    const ttl = new EntityModel().getTimeToLiveEPOC(); // the same of entity registry

    return {
      PK: PK,
      SK: this.buildSKWithAction(action, idempotencyKey),
      createdAt: Date.now(),
      ttl: ttl,
    };
  }

  buildSKWithAction(action, idempotencyKey) {
    return \`$SCAPE_STRING_PARAM{Idempotency.IDEMPOTENCY_MASK}ACTION#$SCAPE_STRING_PARAM{action}#$SCAPE_STRING_PARAM{idempotencyKey}\`;
  }  
}

module.exports = Idempotency;`;
