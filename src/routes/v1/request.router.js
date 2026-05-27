const express = require("express");
const requestRouter = express.Router();
const { profileauth } = require("../../middleware/auth");
const di = require("../../dependencies");
const requestController = di.get("requestController");

requestRouter.post("/send/:status/:touserId", profileauth, requestController.send);
requestRouter.post("/review/:status/:requestId", profileauth, requestController.review);

module.exports = requestRouter;
