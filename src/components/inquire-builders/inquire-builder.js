class InquireBuilder {
  constructor(prompts) {
    this.prompts = prompts;
  }

  /**
   * Build inquire component
   * @returns prompts
   */
  build() {
    return this.prompts;
  }
}

module.exports = InquireBuilder;
