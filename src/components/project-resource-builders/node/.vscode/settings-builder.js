const ProjectFileBuilder = require("../../project-file-builder");
const SettingsTemplate = require("../../../../templates/node/.vscode/settings-template");

class SettingsBuilder extends ProjectFileBuilder {
  constructor(destination) {
    super("settings", destination, "json", SettingsTemplate);
  }
}

module.exports = SettingsBuilder;
