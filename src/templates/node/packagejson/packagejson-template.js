module.exports = `{
  \"name\": \"__PROJECT_NAME__\",
  \"version\": \"__PROJECT_VERSION__\",
  \"description\": \"__PROJECT_DESCRIPTION__\",
  \"main\": \"index.js\",
  \"scripts\": {
    \"test\": \"jest --env node --config .//tests//jest.config.json --coverage\",
    \"start\": \"node .//src//docs//swagger.js && node .//src//index.js\",
    \"build-docs\": \"node .//src//docs//swagger.js\"
  },
  \"keywords\": [
    \"node\"
  ],
  \"author\": \"__PROJECT_AUTHOR__\",
  \"license\": \"ISC\",
  \"dependencies\": {
    \"cors\": \"^2.8.5\",
    \"dotenv\": \"^10.0.0\",
    \"express\": \"^4.17.1\",
    \"express-async-errors\": \"^3.1.1\",
    \"joi\": \"^17.4.2\",
    \"lodash\": \"^4.17.21\",
    \"simple-http-exceptions\": \"^1.0.3\",
    \"swagger-autogen\": \"^2.11.2\",
    \"swagger-ui-express\": \"^4.1.6\",
    \"winston\": \"^3.3.3\",
    __ANOTHER_DEPENDENCIES__
  },
  \"devDependencies\": {
    \"axios-easyfier\": \"^1.0.1\",
    \"jest\": \"^27.3.1\",
    \"prettier\": \"^2.4.1\"
  }
}`;
