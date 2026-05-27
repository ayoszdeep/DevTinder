const logger = require("../utils/logger");

const appErrorHandler = (err, req, res, next) => {
    logger.error(err);

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};

const genericErrorHandler = (err, req, res, next) => {
    logger.error(err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
};

module.exports = { appErrorHandler, genericErrorHandler };
