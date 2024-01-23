//external imports
const jwt = require("jsonwebtoken");

//internal imports
const User = require("../models/UserModel");
const { errorResponse } = require("../helpers/response");
const { jwtSecretKey } = require("../secret");

const authenticate = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      errorResponse(res, 401, "Unauthorized");
    }

    token = token.split(" ")[1];
    const decoded = jwt.verify(token, jwtSecretKey);

    const user = await User.findById(decoded._id);
    if (!user) {
      errorResponse(res, 401, "Unauthorized");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticate };
