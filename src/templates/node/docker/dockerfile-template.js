const stringUtils = require("../../../utils/string-utils");

module.exports =
  stringUtils.removeScapeStringTag(`FROM node:lts-alpine@sha256:b2da3316acdc2bec442190a1fe10dc094e7ba4121d029cb32075ff59bb27390a

RUN apk add dumb-init

WORKDIR /opt
RUN mkdir app
RUN mkdir ./app/config
RUN chmod 777 -R /opt/app/config

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only=production

USER node

CMD [\"dumb-init\", \"npm\", \"start\"]`);
