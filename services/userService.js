const User = require("../models/UserModel");

const findUsers = () => {
  return User.find();
};

const findUserByProperty = (key, value) => {
  if (key === "_id") {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

module.exports = { findUsers, findUserByProperty };
