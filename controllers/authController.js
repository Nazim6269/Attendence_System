//external imports
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//internal imports
const User = require("../models/UserModel");
const { successResponse, errorResponse } = require("../helpers/response");
const { jwtSecretKey } = require("../secret");

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
    let user = new User({ name, password, email });

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    user.password = hashedPass;
    await user.save();

    successResponse(res, 201, "User created Successfuly");
  } catch (error) {
    next(error);
  }
};

//login controller
const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      errorResponse(res, 400, "Invalid Credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      errorResponse(res, 400, "Invalid Credentials");
    }
    delete user._doc.password;
    //create token
    const token = jwt.sign(user._doc, jwtSecretKey, { expiresIn: "2h" });
    successResponse(res, 200, "Successfully Login", token);
  } catch (error) {
    next(error);
  }
};

module.exports = { registerController, loginController, privateController };
