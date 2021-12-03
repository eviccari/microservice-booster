const SrcDirectoryBuilder = require("../../../components/project-resource-builders/node/src/src-directory-builder");
const IndexJsBuilder = require("../../../components/project-resource-builders/node/index/index-js-builder");
const DotenvBuilder = require("../../../components/project-resource-builders/node/dotenv/dotenv-builder");
const GitignoreBuilder = require("../../../components/project-resource-builders/node/gitignore/gitignore-file-builder");
const DockerfileBuilder = require("../../../components/project-resource-builders/node/docker/dockerfile-builder");
const ReadmeBuilder = require("../../../components/project-resource-builders/node/readme/readme-builder");
const ConfigDirectoryBuilder = require("../../../components/project-resource-builders/node/configs/config-directory-builder");
const AwsConfigBuilder = require("../../../components/project-resource-builders/node/configs/aws-config-builder");
const CorsBuilder = require("../../../components/project-resource-builders/node/configs/cors-builder");
const DocumentClientBuilder = require("../../../components/project-resource-builders/node/configs/document-client-builder");
const KafkaConfigBuilder = require("../../../components/project-resource-builders/node/configs/kafka-config-builder");
const LoggingBuilder = require("../../../components/project-resource-builders/node/configs/logging-builder");
const PackageJsonBuilder = require("../../../components/project-resource-builders/node/packagejson/packagejson-builder");
const StartConfigBuilder = require("../../../components/project-resource-builders/node/configs/startup-config-builder");
const CreateDatabaseDirectoryBuilder = require("../../../components/project-resource-builders/node/database/database-directory-builder");
const CreateTableBuilder = require("../../../components/project-resource-builders/node/database/create-table-builder");
const DbMigrationBuilder = require("../../../components/project-resource-builders/node/database/db-migration-builder");
const DescribeTableBuilder = require("../../../components/project-resource-builders/node/database/describe-table-builder");
const MigrateBuilder = require("../../../components/project-resource-builders/node/database/migrate-builder");
const UpdateTimeToLiveBuilder = require("../../../components/project-resource-builders/node/database/update-time-to-live-builder");
const DocsDirectoryBuilder = require("../../../components/project-resource-builders/node/docs/docs-directory-builder");
const SwaggerBuilder = require("../../../components/project-resource-builders/node/docs/swagger-builder");
const MiddlewaresDirectoryBuilder = require("../../../components/project-resource-builders/node/middlewares/middlewares-directory-builder");
const ErrorsMiddlewareBuilder = require("../../../components/project-resource-builders/node/middlewares/errors-middleware-builder");
const LogRequestMiddlewareBuilder = require("../../../components/project-resource-builders/node/middlewares/log-request-middleware-builder");
const ModelsDirectoryBuilder = require("../../../components/project-resource-builders/node/models/models-directory-builder");
const SimpleModelBuilder = require("../../../components/project-resource-builders/node/models/simple-model-builder");
const ErrorMessageDtoBuilder = require("../../../components/project-resource-builders/node/models/error-message-dto-builder");
const EntityBuilder = require("../../../components/project-resource-builders/node/models/entity-model-builder");
const RepositoryDirectoryBuilder = require("../../../components/project-resource-builders/node/repository/repository-directory-builder");
const RepositoryBuilder = require("../../../components/project-resource-builders/node/repository/repository-builder");
const ServicesDirectoryBuilder = require("../../../components/project-resource-builders/node/services/services-directory-builder");
const IdempotencyServiceBuilder = require("../../../components/project-resource-builders/node/services/idempotency-service-builder");
const EntityServiceBuilder = require("../../../components/project-resource-builders/node/services/entity-service-builder");
const DeadLetterQueueServiceBuilder = require("../../../components/project-resource-builders/node/services/dead-letter-queue-service-builder");
const HttpServiceBuilder = require("../../../components/project-resource-builders/node/services/http-service-builder");
const RoutesDirectoryBuilder = require("../../../components/project-resource-builders/node/routes/routes-directory-builder");
const EntityRouterBuilder = require("../../../components/project-resource-builders/node/routes/entity-router-builder");
const HealthCheckRouterBuilder = require("../../../components/project-resource-builders/node/routes/health-check-router-builder");
const IdempotencyRouterBuilder = require("../../../components/project-resource-builders/node/routes/idempotency-router-builder");
const IdempotencyActionsServiceBuilder = require("../../../components/project-resource-builders/node/services/idempotency-actions-service");
const VsCodeDirectoryBuilder = require("../../../components/project-resource-builders/node/.vscode/.vscode-directory-builder");
const SettingsBuilder = require("../../../components/project-resource-builders/node/.vscode/settings-builder");
const TableNameBuilder = require("../../../components/project-resource-builders/node/database/table-name-builder");
class NodejsOrchestrator {
  /**
   * Default constructor to create node project
   * @param {Object} previousAnswers
   */
  constructor(previousAnswers) {
    if (!previousAnswers) throw new Error("Previous answers are required");
    this.previousAnswers = previousAnswers;
    this.projectName = this.previousAnswers.projectName;
    this.entity = this.previousAnswers.entity;
    this.withDB = this.entity !== "";
    this.tableName = this.withDB ? this.previousAnswers.tableName : "";

    this.withKafa =
      this.previousAnswers.purposes.includes("kafka consumer") ||
      this.previousAnswers.purposes.includes("kafka producer");
    this.src = "";
  }

  build() {
    try {
      // create root and src folders
      this.src = this.buildSrc();
      this.buildVsCode();

      this.buildDotEnvExample();
      this.buildGitIgnore();
      this.buildDockerFile();
      this.buildReadme();
      this.buildPackageJson();
      this.buildConfigs();
      this.buildDatabase();
      this.buildDocs();
      this.buildMiddlewares();
      this.buildModels();
      this.buildRepository();
      this.buildServices();
      this.buildRoutes();
      this.buildIndex();
    } catch (error) {
      throw new Error(error);
    }
  }

  buildSrc() {
    return new SrcDirectoryBuilder(this.projectName).build();
  }

  buildVsCode() {
    const vscodeSource = new VsCodeDirectoryBuilder(this.projectName).build();
    new SettingsBuilder(vscodeSource).build();
  }

  buildDotEnvExample() {
    return new DotenvBuilder(this.projectName).build();
  }

  buildGitIgnore() {
    return new GitignoreBuilder(this.projectName).build();
  }

  buildDockerFile() {
    return new DockerfileBuilder(this.projectName).build();
  }

  buildReadme() {
    return new ReadmeBuilder(this.previousAnswers).build();
  }

  buildPackageJson() {
    return new PackageJsonBuilder(this.previousAnswers).build();
  }

  buildConfigs() {
    const configSource = new ConfigDirectoryBuilder(this.projectName).build();
    new CorsBuilder(configSource).build();

    if (this.withDB) {
      new AwsConfigBuilder(configSource).build();
      new DocumentClientBuilder(configSource).build();
    }

    if (this.withKafa) new KafkaConfigBuilder(configSource).build();

    new LoggingBuilder(configSource).build();
    new StartConfigBuilder(
      this.projectName,
      this.previousAnswers.purposes,
      configSource
    ).build();
  }

  buildDatabase() {
    const databaseSource = new CreateDatabaseDirectoryBuilder(
      this.projectName
    ).build();

    new TableNameBuilder(databaseSource, this.tableName).build();
    new CreateTableBuilder(databaseSource).build();
    new DbMigrationBuilder(databaseSource).build();
    new DescribeTableBuilder(databaseSource).build();
    new MigrateBuilder(databaseSource).build();
    new UpdateTimeToLiveBuilder(databaseSource).build();
  }

  buildDocs() {
    const docsSource = new DocsDirectoryBuilder(this.projectName).build();
    new SwaggerBuilder(docsSource).build();
  }

  buildMiddlewares() {
    const middlewaresSource = new MiddlewaresDirectoryBuilder(
      this.projectName
    ).build();

    new ErrorsMiddlewareBuilder(middlewaresSource).build();
    new LogRequestMiddlewareBuilder(middlewaresSource).build();
  }

  buildModels() {
    const modelsSource = new ModelsDirectoryBuilder(this.projectName).build();

    if (this.withKafa) new ErrorMessageDtoBuilder(modelsSource).build();

    if (this.withDB) {
      new EntityBuilder(modelsSource, this.previousAnswers.entity).build();
      new SimpleModelBuilder(modelsSource).build();
    }
  }

  buildRepository() {
    if (this.withDB) {
      const repositorySource = new RepositoryDirectoryBuilder(
        this.projectName
      ).build();

      new RepositoryBuilder(repositorySource).build();
    }
  }

  buildServices() {
    const serviceSource = new ServicesDirectoryBuilder(
      this.projectName
    ).build();

    new IdempotencyServiceBuilder(serviceSource).build();
    new IdempotencyActionsServiceBuilder(serviceSource).build();
    new HttpServiceBuilder(serviceSource).build();

    if (this.withDB)
      new EntityServiceBuilder(serviceSource, this.entity).build();
    if (this.withKafa) new DeadLetterQueueServiceBuilder(serviceSource).build();
  }

  buildRoutes() {
    const routesSource = new RoutesDirectoryBuilder(this.projectName).build();

    new HealthCheckRouterBuilder(routesSource).build();
    new IdempotencyRouterBuilder(routesSource).build();

    if (this.withDB) new EntityRouterBuilder(routesSource).build();
  }

  buildIndex() {
    return new IndexJsBuilder(this.src, this.withDB).build();
  }
}

module.exports = NodejsOrchestrator;
