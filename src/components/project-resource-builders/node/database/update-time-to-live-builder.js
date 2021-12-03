const ProjectFileBuilder = require("../../project-file-builder");
const UpdateTimeToLiveTemplate = require("../../../../templates/node/database/update-time-to-live-template");

class UpdateTimeToLiveBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super("update-time-to-live", configSource, "js", UpdateTimeToLiveTemplate);
  }
}

module.exports = UpdateTimeToLiveBuilder;
