module.exports = `const _ = require(\"lodash\");
const UnprocessableEntity = require(\"simple-http-exceptions/errors/unprocessable-entity-exception\");
const TIME_TO_LIVE_IN_DAYS = parseInt(process.env.TIME_TO_LIVE_IN_DAYS || \"7\", 10);

class SimpleModel {

   constructor(modelSchema){
       this.modelSchema = modelSchema
   }
  
  /**
   * Get the current schema validation for entity
   * @return {Joi.ObjectSchema<any>}
   */
  get schema() {
    return this.modelSchema;
  }

  /**
   * Get the number that represents epoc days to set time to live for entity.
   * @return timeToLive {number}
   */
  getTimeToLiveEPOC() {
    const hours = TIME_TO_LIVE_IN_DAYS * 24;
    return Math.floor(Date.now() + 1000 * 3600 * hours);
  }

  /**
   * Validate entity
   * @param entity
   * @return {Promise<void>}
   */
  async validate(entity) {
    try {
      await this.modelSchema.validateAsync(entity);
    } catch (error) {
      throw new UnprocessableEntity(this.formatErrorMessage(error.message));
    }
  }
  
  /**
   * Take an error message and replace blank spaces by _
   * Also replaces all " character by empty string
   * @param {string} message
   * @returns {string} new message
   */
  formatErrorMessage(message) {
    let newMessage = _.replace(message, / /g, \"_\");
    newMessage = _.replace(newMessage, /\"/g, \"\");
    newMessage = _.replace(newMessage, /-/g, \"_\").toLowerCase();

    return newMessage;
  }
  

}

module.exports = SimpleModel;`;
