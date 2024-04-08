const express = require("express");
const { getSingleUser, getUsers } = require("../controller/usersController.js");
const { verifyTokan } = require("../services/service.js");

const userRouter = express.Router();

userRouter.get("/users:id", verifyTokan, getUsers);
userRouter.get("/single_user:id", getSingleUser);

module.exports = { userRouter };
