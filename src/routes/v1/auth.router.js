const express = require("express");
const authRouter = express.Router();
const di = require("../../dependencies");
const authController = di.get("authController");

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);

module.exports = authRouter;
