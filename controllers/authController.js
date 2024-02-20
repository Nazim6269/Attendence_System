//external imports
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//internal imports
const User = require("../models/UserModel");
const { successResponse, errorResponse } = require("../helpers/response");
const { jwtSecretKey } = require("../secret");
const { registerService, loginService } = require("../services/authService");

//private controller
const privateController = async (_req, res, _next) => {
  successResponse(res, 200, "I am private route");
};

//register controller
const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    errorResponse(res, 400, "Insufficeint Data");
  }
  try {
    const user = await registerService({ name, email, password });
    successResponse(res, 201, "User created Successfuly");
  } catch (error) {
    next(error);
  }
};

//login controller
const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await loginService(email, password);
    successResponse(res, 200, "Successfully Login", token);
  } catch (error) {
    next(error);
  }
};

module.exports = { registerController, loginController, privateController };
