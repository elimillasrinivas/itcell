const express = require("express");
const authController = require("../controllers/authController");

const userRouter = express.Router();

userRouter.post("/register", authController.register);
userRouter.post("/login", authController.login);
userRouter.put("/update-password", authController.authenticateToken, authController.updatePassword);
userRouter.put("/reset-password", authController.resetPassword);

module.exports = userRouter;