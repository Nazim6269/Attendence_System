//external imports
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
//internal imports
const User = require("../models/UserModel");

const { jwtSecretKey } = require("../secret");
const { createUserService } = require("./userService");

//registerSevice
const registerService = async (name, password, email, roles, accountStatus) => {
  let user = await createUserService(
    name,
    password,
    email,
    roles,
    accountStatus
  );

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  user.password = hashedPass;

  await user.save();
};

//loginService function starts from here
const loginService = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw createError(400, "Invalid Credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("2", isMatch);

    if (!isMatch) {
      throw createError(400, "Incorrect Password");
    }
    delete user._doc.password;
    //create token

    const token = jwt.sign(user._doc, jwtSecretKey, { expiresIn: "2h" });
    console.log("3", token);
    return token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerService, loginService };
