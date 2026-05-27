const express = require("express");
const profileRouter = express.Router();
const { profileauth } = require("../../middleware/auth");
const profileController = require("../../controllers/profile.controller");

profileRouter.get("/view", profileauth, profileController.view);
profileRouter.patch("/edit", profileauth, profileController.edit);

module.exports = profileRouter;
