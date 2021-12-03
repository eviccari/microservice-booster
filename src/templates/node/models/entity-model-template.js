module.exports = `const Joi = require(\"joi\");
const SimpleModel = require(\"./simple-model\");

class __ENTITY_NAME__ extends SimpleModel {
  constructor() {
    super(
       Joi.object({
          PK: Joi.string().required(),
          SK: Joi.string().required(),  
          idempotencyKey: Joi.string().required(),
          observableId: Joi.string().required(),
          status: Joi.string().required(),
          createdAt: Joi.date().required(),
          createdBy: Joi.string().required(),
          updatedAt: Joi.date().optional().allow(null),
          updatedBy: Joi.string().optional().allow(null),
          version: Joi.number().required(),
       })
    );   
  }

}

module.exports = __ENTITY_NAME__;`;
