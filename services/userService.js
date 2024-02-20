const User = require("../models/UserModel");

const findUsers = () => {
  return User.find();
};

module.exports = { findUsers };
