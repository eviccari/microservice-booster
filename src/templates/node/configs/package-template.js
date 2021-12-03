module.exports = `{
    \"name\": \"$PROJECT_NAME\",
    \"version\": \"$PROJECT_VERSION\",
    \"description\": \"$PROJECT_DESCRIPTION\",
    \"main\": \".//src//index.js\",
    \"scripts\": {
      \"test\": \"echo \"Error: no test specified\"\",
      \"start\": "node .//src//docs/swagger.js && node index.js\",
      \"swagger-autogen\": \"node .//docs/swagger.js\"
    },
    \"keywords\": [
      \"nodejs\",
      \"api\"
    ],
    \"author\": \"$PROJECT_AUTHOR\",
    \"license\": \"ISC\",
    \"devDependencies\": {
      \"prettier\": \"$NODEJS_PRETTIER_VERSION\"
    },
    \"dependencies\": {
        $NODEJS_DEPENDENCIES
    },
      \"devDependencies\": {
        $NODEJS_DEV_DEPENDENCIES  
    }
  }`;
