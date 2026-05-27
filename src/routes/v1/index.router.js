const express = require("express");
const authRouter = require("./auth.router");
const profileRouter = require("./profile.router");
const requestRouter = require("./request.router");
const userRouter = require("./user.router");

const v1Router = express.Router();

v1Router.use("/auth", authRouter);
v1Router.use("/profile", profileRouter);
v1Router.use("/request", requestRouter);
v1Router.use("/user", userRouter);

module.exports = v1Router;
