const SEPARATOR = require("path").sep;
const HOMEDIR = require("os").homedir();
const ROOT_FOLDER = HOMEDIR + SEPARATOR + process.env.ROOT_FOLDER;

module.exports = {
  SEPARATOR: SEPARATOR,
  HOMEDIR: HOMEDIR,
  ROOT_FOLDER: ROOT_FOLDER,
};
