const { removeScapeStringTag } = require("../../../utils/string-utils");

module.exports = removeScapeStringTag(`const environment = process.env.NODE_ENV;

const names = {
  develop: \"__TABLE_NAME__\",
  production: \"__TABLE_NAME__\",
  test: \"__TABLE_NAME__\",
};

module.exports = names[environment];`);
