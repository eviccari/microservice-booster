require("dotenv").config();
require("../src/configs/contrl-c-register")();
const EntityOrchestrator = require("./orchestrators/inquire-orchestrators/entity-orchestrator");
const StartOrchestrator = require("./orchestrators/inquire-orchestrators/start-orchestrator");
const TableNameOrchestrator = require("./orchestrators/inquire-orchestrators/table-name-orchestrator");
const NodejsOrchestrator = require("./orchestrators/project-orchestrators/node/nodejs-orchestrator");
const startOrchestrator = new StartOrchestrator();

let answers = {};

const inquire = async () => {
  try {
    answers = await startOrchestrator.inquire();
    answers = await new EntityOrchestrator(answers).inquire();
    answers = await new TableNameOrchestrator(answers).inquire();

    if (answers.stack === "node") {
      const orchestrator = new NodejsOrchestrator(answers);
      orchestrator.build();
    } else {
      console.log("NOT SUPPORTED YET");
      process.exit(1);
    }

    return answers;
  } catch (error) {
    throw new Error(error);
  }
};

inquire()
  .then((result) => console.log(`SUCCESS!:\n ${JSON.stringify(result)}`))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
