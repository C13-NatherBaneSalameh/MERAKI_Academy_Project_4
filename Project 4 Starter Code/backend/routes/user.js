const express = require("express");
// const { register, login } = require("../controllers/users");
const {register,login}=require("../controllers/user")

// define router
const usersRouter = express.Router();



usersRouter.post("/register", register);

usersRouter.post("/login", login);

module.exports = usersRouter;