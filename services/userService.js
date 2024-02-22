const User = require("../models/UserModel");

const findUsersService = () => {
  return User.find();
};

// find user by property function
const findUserByPropertyService = (key, value) => {
  if (key === "_id") {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

//create new user function
const createUserService = async (
  name,
  email,
  password,
  roles,
  accountStatus
) => {
  const user = await User.create({
    name,
    password,
    email,
    roles: roles ? roles : ["STUDENT"],
    accountStatus: accountStatus ? accountStatus : "PENDING",
  });
  return user;
};

//delete user service
const deleteUserService = async (id) => {
  await User.findByIdAndDelete(id);
};

module.exports = {
  findUsersService,
  findUserByPropertyService,
  createUserService,
  deleteUserService,
};
