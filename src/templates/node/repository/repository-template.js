const stringUtils = require("../../../utils/string-utils");

module.exports = stringUtils.removeScapeStringTag(
  `const IdempotencyService = require(\"../services/idempotency\");
const IdempotencyActions = require(\"../services/idempotency-actions\");
const documentClient = require(\"../configs/document-client\");
const TABLE_NAME = require(\"../database/table-name\");

class Repository {
  constructor() {}

  /**
   * Create new entity on table
   * @param entity {Object}
   * @return {Promise<Object>}
   */
  create(entity) {
    return new Promise((resolve, reject) => {
      const putParams = {
        TableName: TABLE_NAME,
        Item: entity
      };

      const { PK, idempotencyKey } = entity;

      const idempotencyParams = {
        TableName: TABLE_NAME,
        Item: new IdempotencyService().buildIdempotencyBody(
          PK,
          IdempotencyActions.CREATE,
          idempotencyKey
        )
      };

      documentClient.transactWrite(
        {
          TransactItems: [
            {
              Put: putParams 
            },
            {
              Put: idempotencyParams 
            } 
          ]
        },
        (error, data) => {
          if (error) {
            reject(error.message);
          } else {
            resolve(data);
          }
        }
      );
    });
  }

  /**
   * Update entity
   * @param keyValuePairsObject
   * @return {Promise<object>}
   */
  update(keyValuePairsObject) {
    return new Promise((resolve, reject) => {
      const { PK, idempotencyKey } = keyValuePairsObject; // before call buildUpdateObjectParams because this method affects the keyValuePairsObject
      const updateParams = this.buildUpdateObjectParams(keyValuePairsObject);

      const idempotencyParams = {
        TableName: TABLE_NAME,
        Item: new IdempotencyService().buildIdempotencyBody(
          PK,
          IdempotencyActions.UPDATE,
          idempotencyKey
        )
      };

      documentClient.transactWrite(
        {
          TransactItems: [
            {
              Update: updateParams
            },
            {
              Put: idempotencyParams
            }
          ]
        },
        (error, data) => {
          if (error) {
            reject(error.message);
          } else {
            resolve(data.Item);
          }
        }
      );
    });
  }

  /**
   * Get entity from database searching by complete key
   * @param PK {string}
   * @param SK {string}
   * @return {Promise<Object>}
   */
  findByUnique(PK, SK) {
    return new Promise((resolve, reject) => {
      const params = {
        Key: {
          PK: PK,
          SK: SK
        },
        TableName: TABLE_NAME
      };

      documentClient.get(params, (error, data) => {
        if (error) {
          reject(error.message);
        } else if (data.Item === undefined) {
          resolve(null);
        } else {
          resolve(data.Item);
        }
      });
    });
  }

  /**
   * Get entities searching by partition key
   * @param PK {string}
   * @return {Promise<Array[Object]>}
   */
  findByPk(PK) {
    return new Promise((resolve, reject) => {
      const params = {
        KeyConditionExpression: \"PK = :PK\",
        ExpressionAttributeValues: {
          \":PK\": PK
        },
        TableName: TABLE_NAME
      };

      documentClient.query(params, (error, data) => {
        if (error) {
          reject(error.message);
        } else if (data.Items.length > 0) {
          resolve(data.Items);
        } else {
          resolve(null);
        }
      });
    });
  }

  /**
   * Delete entity from database by complete key
   * @param PK {string}
   * @param SK {string}
   * @return {Promise<Object>}
   */
  delete(PK, SK) {
    return new Promise((resolve, reject) => {
      const params = {
        Key: {
          PK: PK,
          SK: SK
        },
        TableName: TABLE_NAME,
        ReturnValues: \"ALL_OLD\"
      };

      documentClient.delete(params, (error, data) => {
        if (error) {
          reject(error.message);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Build the object that configure dynamo update instruction
   * - Necessary fields to be sent in keyValuePairsObject param:
   *   - PK: partition key
   *   - SK: sort key
   *   - idempotencyKey: transaction token
   *   - status: new status of entity
   *   - keyCheck: must be the number of entity version to check reservation
   * @param keyValuePairsObject
   * @return {Object}
   */
  buildUpdateObjectParams(keyValuePairsObject) {
    this.validateKeyPairsForUpdate(keyValuePairsObject);

    const keyCheck = keyValuePairsObject[\"keyCheck\"];
    const key = {
      PK: keyValuePairsObject[\"PK\"],
      SK: keyValuePairsObject[\"SK\"]
    };

    this.cleanUpdateExpression(keyValuePairsObject); // only attributes that must to be changed

    let updateParam = {};
    updateParam.TableName = TABLE_NAME;
    updateParam.Key = key;

    updateParam.ConditionExpression = \"version = :_keyCheck\";
    updateParam.ReturnValues = \"UPDATED_NEW\";

    updateParam.UpdateExpression = \"set \";
    updateParam.ExpressionAttributeNames = {};
    updateParam.ExpressionAttributeValues = {};

    for (const key in keyValuePairsObject) {
      const attributeNameMask = \`#$SCAPE_STRING_PARAM{key}\`;
      const attributeValueMask = \`:_$SCAPE_STRING_PARAM{key}\`;

      updateParam.UpdateExpression = updateParam.UpdateExpression.concat(
        \`$SCAPE_STRING_PARAM{attributeNameMask} = $SCAPE_STRING_PARAM{attributeValueMask}, \`
      );

      updateParam.ExpressionAttributeNames[attributeNameMask] = key;
      updateParam.ExpressionAttributeValues[attributeValueMask] =
        keyValuePairsObject[key];
    }

    updateParam.ExpressionAttributeValues[\":_keyCheck\"] = keyCheck; // bind keyCheck value
    updateParam.UpdateExpression = updateParam.UpdateExpression.slice(0, -2); // remove last comma and blank space

    return updateParam;
  }

  /**
   * Remove reserved words from key value pair
   * @param keyValuePairsObject
   */
  cleanUpdateExpression(keyValuePairsObject) {
    delete keyValuePairsObject[\"timestamps\"];
    delete keyValuePairsObject[\"PK\"];
    delete keyValuePairsObject[\"SK\"];
    delete keyValuePairsObject[\"keyCheck\"];
    delete keyValuePairsObject[\"tableName\"];
    delete keyValuePairsObject[\"createdAt\"];
    delete keyValuePairsObject[\"createdBy\"];
  }
  
  
  /**
   * Validates that object have necessary attributes to update
   * @param keyValuePairsObject
   */
  validateKeyPairsForUpdate(keyValuePairsObject) {
    if (!keyValuePairsObject[\"PK\"]) throw new Error(\"pk_is_required\");
    if (!keyValuePairsObject[\"SK\"]) throw new Error(\"sk_is_required\");
    if (!keyValuePairsObject) throw new Error(\"key_value_pairs_are_required\");

    if (!keyValuePairsObject[\"idempotencyKey\"])
      throw new Error(\"idempotency_key_is_required\");

    if (!keyValuePairsObject[\"keyCheck\"])
      throw new Error(\"key_check_is_required\");

    if (!keyValuePairsObject[\"status\"]) throw new Error("status_is_required");
  }
}

module.exports = Repository;`
);
