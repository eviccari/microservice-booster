const InputBuilder = require("../../components/inquire-builders/input-builder");
const InquireStacker = require("../../components/inquire-builders/inquire-stacker");
const Orchestrator = require("./orchestrator");

class TableNameOrchestrator extends Orchestrator {
  /**
   * Default constructor for EntityOrchestrator.
   * The previous answers will help decisions here
   * @param {Object} previousAnswers
   */
  constructor(previousAnswers) {
    super(new InquireStacker());

    if (!previousAnswers) throw new Error("Previous answers are required");

    this.previousAnswers = previousAnswers;
  }

  async inquire() {
    if (!this.previousAnswers.purposes.includes("REST API"))
      return this.previousAnswers;

    this.inquireStacker.append(
      new InputBuilder("tableName", "Table Name", "").build()
    );

    const answer = await this.inquireStacker.startPrompt();
    return { ...this.previousAnswers, ...answer };
  }
}

module.exports = TableNameOrchestrator;
