class Orchestrator {
  /**
   * Default constructor for orchestrator
   * @param {InquireStacker} inquireStacker
   */
  constructor(inquireStacker) {
    this.inquireStacker = inquireStacker;
  }

  /**
   * Make some questions
   */
  inquire() {
    if (this.getPrompts().length === 0) {
      throw new Error("No prompts loaded yet");
    }
  }

  /**
   * Get all created prompts
   * @returns prompts
   */
  getPrompts() {
    if (this.inquireStacker.getPrompts().length === 0) {
      throw new Error("No prompts loaded yet");
    }
    return this.inquireStacker.getPrompts();
  }
}

module.exports = Orchestrator;
