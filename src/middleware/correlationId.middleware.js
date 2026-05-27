const { v4: uuidV4 } = require("uuid");
const { asyncLocalStorage } = require("../utils/helpers/request.helpers");

const attachCorrelationIdMiddleware = (req, res, next) => {
    const correlationId = uuidV4();

    req.headers["x-correlation-id"] = correlationId;
    res.setHeader("x-correlation-id", correlationId);

    asyncLocalStorage.run({ correlationId }, () => {
        next();
    });
};

module.exports = { attachCorrelationIdMiddleware };
