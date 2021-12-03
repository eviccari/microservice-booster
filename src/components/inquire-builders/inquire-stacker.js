const inquirer = require("inquirer");

class InquireStacker {
  constructor() {
    this.prompts = [];
  }

  /**
   * Add more prompts
   * @param {Array[Object]} prompts
   */
  append(prompts) {
    this.prompts = this.prompts.concat(prompts);
  }

  /**
   * Get all stacked prompts
   * @returns {Array[Object]}
   */
  getPrompts() {
    return this.prompts;
  }

  /**
   * Start inquirer prompt
   * @returns answers
   */
  async startPrompt() {
    if (this.prompts.length === 0) {
      throw new Error("Prompts not load yet");
    }

    try {
      return await inquirer.prompt(this.getPrompts());
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = InquireStacker;
