//internal imports
const { successResponse, errorResponse } = require("../helpers/response");
const { jwtSecretKey } = require("../secret");
const { registerService, loginService } = require("../services/authService");

//private controller
const privateController = async (_req, res, _next) => {
  successResponse(res, 200, "I am private route");
};

//register controller
const registerController = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;

  if (!name || !email || !password) {
    errorResponse(res, 400, "Insufficeint Data");
  }
  try {
    const user = await registerService(
      name,
      email,
      password,
      roles,
      accountStatus
    );
    successResponse(res, 201, "User created Successfuly");
  } catch (error) {
    next(error);
  }
};

//login controller
//TODO: have to complete login functionality, lectrue: last portion of 24 and 24
const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await loginService(email, password);
    if (!token) {
      errorResponse(res, 400, "Failed to login");
    }
    console.log("1");
    successResponse(res, 200, "Successfully Login", token);
  } catch (error) {
    next(error);
  }
};

module.exports = { registerController, loginController, privateController };
