module.exports = `module.exports = function (req, res, next) {
    const { body, headers } = req;

    body.idempotencyKey = headers[\"idempotency-key\"];
    body.observableId = headers[\"observable-id\"];

    next();
};`;
