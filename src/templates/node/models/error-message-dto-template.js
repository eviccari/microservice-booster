module.exports = `class ErrorMessageDto {
  /**
   * Default constructor
   * @param {string} idempotencyKey
   * @param {string} observableId
   * @param {string} key
   * @param {string} eventType
   * @param {string} message
   * @param {string} errorMessage
   */
  constructor(
    idempotencyKey,
    observableId,
    key,
    eventType,
    message,
    errorMessage
  ) {
    this.idempotencyKey = idempotencyKey;
    this.observableId = observableId;
    this.key = key;
    this.eventType = eventType;
    this.message = message;
    this.errorMessage = errorMessage;
  }

  /**
   * Create a new instance of ErrorMessageDto
   * @return {{idempotencyKey, errorMessage, eventType, message, observableId, key}}
   */
  build() {
    return {
      idempotencyKey: this.idempotencyKey,
      observableId: this.observableId,
      key: this.key,
      eventType: this.eventType,
      message: this.message,
      errorMessage: this.errorMessage,
    };
  }
}

module.exports = ErrorMessageDto;`;
