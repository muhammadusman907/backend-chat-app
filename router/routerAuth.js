const express = require("express");
const { register, login } = require("../controller/authController.js");

const authRouter = express.Router();

authRouter.post("/signup", register);
authRouter.post("/login", login);

module.exports = authRouter;
