//external imports
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//internal imports
const User = require("../models/UserModel");
const { errorResponse } = require("../helpers/response");
const { jwtSecretKey } = require("../secret");

//registerSevice
const registerService = async (name, password, email) => {
  let user = new User({ name, password, email });

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  user.password = hashedPass;
  await user.save();
};

//loginService
const loginService = async (email, password) => {
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
  return token;
};

module.exports = { registerService, loginService };
