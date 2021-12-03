const ProjectFileBuilder = require("../../project-file-builder");
const HealthCheckRouterTemplate = require("../../../../templates/node/routes/health-check-router-template");

class HealthCheckRouterBuilder extends ProjectFileBuilder {
  constructor(configSource) {
    super("health-check", configSource, "js", HealthCheckRouterTemplate);
  }
}

module.exports = HealthCheckRouterBuilder;
