const express = require("express");
const requestRouter = express.Router();
const { profileauth } = require("../../middleware/auth");
const requestController = require("../../controllers/request.controller");

requestRouter.post("/send/:status/:touserId", profileauth, requestController.send);
requestRouter.post("/review/:status/:requestId", profileauth, requestController.review);

module.exports = requestRouter;
