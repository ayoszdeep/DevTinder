const { AsyncLocalStorage } = require("async_hooks");

const asyncLocalStorage = new AsyncLocalStorage();

const getCorrelationId = () => {
    const asyncStore = asyncLocalStorage.getStore();
    return asyncStore?.correlationId || "unknown-error-while-creating-correlation-id";
};

module.exports = { asyncLocalStorage, getCorrelationId };
