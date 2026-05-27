class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 500;
        this.name = "InternalServerError";
    }
}

class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 400;
        this.name = "BadRequestError";
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 404;
        this.name = "NotFoundError";
    }
}

class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 401;
        this.name = "UnauthorizedError";
    }
}

class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 403;
        this.name = "ForbiddenError";
    }
}

class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 409;
        this.name = "ConflictError";
    }
}

class NotImplementedError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = 501;
        this.name = "NotImplementedError";
    }
}

module.exports = {
    InternalServerError,
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
    ForbiddenError,
    ConflictError,
    NotImplementedError,
};
