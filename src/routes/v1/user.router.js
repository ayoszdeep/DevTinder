const express = require("express");
const { profileauth } = require("../../middleware/auth");
const di = require("../../dependencies");
const userController = di.get("userController");
const userRouter = express.Router();

userRouter.get("/request/received", profileauth, userController.getReceivedRequests);
userRouter.get("/connections", profileauth, userController.getConnections);
userRouter.get("/feed", profileauth, userController.getFeed);

module.exports = userRouter;
