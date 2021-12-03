const SimpleFileBuilder = require("../../simple-file-builder");
const StartupConfigTemplate = require("../../../../templates/node/configs/startup-template");
const FileBuilder = require("../../../../services/resource-builders/file-builder");
const { replaceAll } = require("../../../../utils/string-utils");

class StartupConfigBuilder extends SimpleFileBuilder {
  constructor(projectName, purposes, destination) {
    super("startup", "js", destination);
    this.purposes = purposes;
  }

  build() {
    let content = StartupConfigTemplate;
    let withKafkaConsumer = this.purposes.includes("kafka consumer");
    let withDB = this.purposes.includes("REST API");

    content = replaceAll(
      content,
      "__ENTITY_IMPORT__",
      withDB ? 'const entityRouter = require("../routes/entity");' : ""
    );

    content = replaceAll(
      content,
      "__ENTITY_ROUTER__",
      withDB ? 'app.use("/", entityRouter);' : ""
    );

    content = replaceAll(
      content,
      "__KAFKA_IMPORT__",
      withKafkaConsumer
        ? 'const KafkaConsumer = require("../services/kafka-consumer");'
        : ""
    );
    content = replaceAll(
      content,
      "__KAFKA_START__",
      withKafkaConsumer ? "new KafkaConsumer().start();" : ""
    );

    return FileBuilder.build(
      this.destination,
      this.filename,
      this.extension,
      content
    );
  }
}

module.exports = StartupConfigBuilder;
