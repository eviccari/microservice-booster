const stringUtils = require("../../../utils/string-utils");

module.exports =
  stringUtils.removeScapeStringTag(`const BadRequestException = require(\"simple-http-exceptions/errors/bad-request-exception\");
const NotFoundException = require(\"simple-http-exceptions/errors/not-found-exception\");
const InternalServerErrorException = require(\"simple-http-exceptions/errors/internal-server-error-exception\");
const Repository = require(\"../repository/repository\");
const repository = new Repository();
const EntityModel = require(\"../models/__ENTITY_NAME__\");
const IDEMPOTENCY_MASK = process.env.IDEMPOTENCY_MASK;
const logger = require(\"../configs/logging\")();
const CREATED = \"CREATED\";
const CREATED_BY = \"api\";
const UPDATED = \"UPDATED\";
const RETURN_NULL_WHEN_NOT_FOUND = true;

class Entity {
  constructor() {}

  /**
   * Create new entity on table
   * @param newEntity
   * @return {Promise<Object>}
   */
  async create(newEntity) {
    try {
      this.setEntityKeys(newEntity);

      let checkByIdempotency = await this.findByUnique(
        newEntity.PK,
        this.getIdempotencyKeyCheck(newEntity),
        RETURN_NULL_WHEN_NOT_FOUND
      );

      if (checkByIdempotency) {
        // check if already exists by idempotency key
        const result = await this.findByUnique(newEntity.PK, newEntity.SK);
        this.formatDates(result);
        return result;
      } else {
        // check already by PK and SK
        let already = await this.findByUnique(
          newEntity.PK,
          newEntity.SK,
          RETURN_NULL_WHEN_NOT_FOUND
        );

        if (already) {
          this.formatDates(already);
          return already;
        } else {
          newEntity.createdAt = Date.now();
          newEntity.createdBy = CREATED_BY;
          newEntity.status = CREATED;
          newEntity.createdAt = Date.now();
          newEntity.version = 1;

          await new DiffModel().validate(newEntity);
          await repository.create(newEntity);
          const result = await this.findByUnique(newEntity.PK, newEntity.SK);
          this.formatDates(result);
          return result;
        }
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  
  /**
   * Update entity
   * @param newEntity
   * @return {Promise<Object>}
   */
  async update(newEntity) {
    this.setEntityKeys(newEntity);

    const checkByIdempotency = await this.findByUnique(
      newEntity.PK,
      this.getIdempotencyKeyCheck(newEntity),
      RETURN_NULL_WHEN_NOT_FOUND
    );

    if (checkByIdempotency) {
      let result = await this.findByUnique(newEntity.PK, newEntity.SK);
      this.formatDates(result);
      return result;
    } else {
      let actual = await this.findByUnique(newEntity.PK, newEntity.SK);

      const keyValuePairs = await this.buildForUpdate(actual, newEntity); // change actual values in memory to validate

      try {
        await repository.update(keyValuePairs);
        this.formatDates(actual);
        return actual;
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }
  }

  /**
   * Get entity from database searching by complete key
   * @param PK
   * @param SK
   * @param returnNullWhenNotFound
   * @return {Promise<Object>}
   */
  async findByUnique(PK, SK, returnNullWhenNotFound = false) {
    if (!PK || !SK) {
      throw new BadRequestException(\"partition_key_and_sort_key_are_required\");
    }

    let result = null;

    try {
      result = await repository.findByUnique(PK, SK);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!result) {
      if (returnNullWhenNotFound) {
        return null;
      } else {
        throw new NotFoundException(\"not_found\");
      }
    } else {
      this.formatDates(result);
      return result;
    }
  }

  /**
   * Get entities searching by partition key
   * @param PK
   * @return {Promise<Array[Object]>}
   */
  async findByPk(PK) {
    if (!PK) {
      throw new BadRequestException(\"partition_key_is_required\");
    }

    let result = null;

    try {
      result = await repository.findByPk(PK);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!result) {
      throw new NotFoundException(\"not_found\");
    } else {
      result.forEach((r) => {
         this.formatDates(r);
      });
      return result;
    }
  }

  /**
   * Delete entity from database by complete key
   * @param PK
   * @param SK
   */
  async delete(PK, SK) {
    if (!PK || !SK) {
      throw new BadRequestException(\"partition_key_and_sort_key_are_required\");
    }

    try {
      logger.warn(\`DELETE_entity|PK: $SCAPE_STRING_PARAM{PK}|SK: $SCAPE_STRING_PARAM{SK}\`);
      await repository.delete(PK, SK);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  
  /**
   * Get the formatted idempotency key to check if already exists
   * @param entity
   * @return idempotency key check
   */
  getIdempotencyKeyCheck(entity) {
    return \`$SCAPE_STRING_PARAM{IDEMPOTENCY_MASK}$SCAPE_STRING_PARAM{entity.idempotencyKey}\`;
  }
  
  /**
   * Validate new values and build key value pairs to update entity
   * @param actualValues
   * @param newValues
   * @return {Promise<Object>}
   */
  async buildForUpdate(actualValues, newValues) {
    const keyCheck = actualValues.version;

    // TODO -- ADD CHANGED VALUES FOR YOUR ENTITY
    actualValues.version++;
    actualValues.idempotencyKey = newValues.idempotencyKey;
    actualValues.observableId = newValues.observableId;
    actualValues.updatedAt = Date.now();
    actualValues.updatedBy = newValues.updatedBy || CREATED_BY;
    actualValues.status = UPDATED;

    await new EntityModel().validate(actualValues); // validate new values

    let keyValuePairs = {};
    for (const key in actualValues) {
      // copy validated data into key value pairs object
      keyValuePairs[\`$SCAPE_STRING_PARAM{key}\`] = actualValues[\`$SCAPE_STRING_PARAM{key}\`];
    }
    keyValuePairs[\"keyCheck\"] = keyCheck; // keyCheck not in default entity

    return keyValuePairs;
  }  

  /**
   * Format epoc dates
   * @param entity
   */
  formatDates(entity) {
    if (entity.ttl !== undefined) {
      entity.ttl = new Date(entity.ttl).toISOString();
    }

    if (entity.createdAt !== undefined) {
      entity.createdAt = new Date(entity.createdAt).toISOString();
    }
  }
}

module.exports = Entity;`);
