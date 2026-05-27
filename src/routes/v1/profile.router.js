const express = require("express");
const profileRouter = express.Router();
const { profileauth } = require("../../middleware/auth");
const di = require("../../dependencies");
const profileController = di.get("profileController");

profileRouter.get("/view", profileauth, profileController.view);
profileRouter.patch("/edit", profileauth, profileController.edit);
profileRouter.delete("/delete", profileauth, profileController.deleteAccount);

module.exports = profileRouter;
