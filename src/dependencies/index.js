const Container = require("./container");

const di = new Container();

// Repositories
di.register("userRepository", () => require("../repositories/user.repository"));
di.register("connectionRequestRepository", () => require("../repositories/connectionRequest.repository"));

// Services
di.register("authService", (c) => {
    const createAuthService = require("../services/auth.service");
    return createAuthService({ userRepository: c.get("userRepository") });
});

di.register("profileService", (c) => {
    const createProfileService = require("../services/profile.service");
    return createProfileService({
        userRepository: c.get("userRepository"),
        connectionRequestRepository: c.get("connectionRequestRepository"),
    });
});

di.register("requestService", (c) => {
    const createRequestService = require("../services/request.service");
    return createRequestService({
        userRepository: c.get("userRepository"),
        connectionRequestRepository: c.get("connectionRequestRepository"),
    });
});

di.register("userService", (c) => {
    const createUserService = require("../services/user.service");
    return createUserService({
        userRepository: c.get("userRepository"),
        connectionRequestRepository: c.get("connectionRequestRepository"),
    });
});

// Controllers
di.register("authController", (c) => {
    const createAuthController = require("../controllers/auth.controller");
    return createAuthController({ authService: c.get("authService") });
});

di.register("profileController", (c) => {
    const createProfileController = require("../controllers/profile.controller");
    return createProfileController({ profileService: c.get("profileService") });
});

di.register("requestController", (c) => {
    const createRequestController = require("../controllers/request.controller");
    return createRequestController({ requestService: c.get("requestService") });
});

di.register("userController", (c) => {
    const createUserController = require("../controllers/user.controller");
    return createUserController({ userService: c.get("userService") });
});

module.exports = di;
