const InputBuilder = require("../../components/inquire-builders/input-builder");
const InquireStacker = require("../../components/inquire-builders/inquire-stacker");
const ListBuilder = require("../../components/inquire-builders/list-builder");
const CheckboxBuilder = require("../../components/inquire-builders/checkbox-builder");
const Orchestrator = require("./orchestrator");

class StartOrchestrator extends Orchestrator {
  constructor() {
    super(new InquireStacker());
  }

  async inquire() {
    this.inquireStacker.append(
      new InputBuilder(
        "projectName",
        "Please input project name",
        "project-name"
      ).build()
    );

    this.inquireStacker.append(
      new InputBuilder("author", "Author name", "Author Name").build()
    );

    this.inquireStacker.append(
      new InputBuilder("desc", "Project Description", "Description").build()
    );

    this.inquireStacker.append(
      new InputBuilder("version", "Version", "0.0.1").build()
    );

    this.inquireStacker.append(
      new ListBuilder("stack", "Choose stack", ["node", "java", ".net"]).build()
    );

    this.inquireStacker.append(
      new CheckboxBuilder("purposes", "Purposes", [
        "kafka consumer",
        "kafka producer",
        "REST API",
      ]).build()
    );

    return this.inquireStacker.startPrompt();
  }
}

module.exports = StartOrchestrator;
