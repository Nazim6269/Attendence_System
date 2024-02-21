const { successResponse, errorResponse } = require("../helpers/response");
const { findUsers, findUserByProperty } = require("../services/userService");

//get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await findUsers();
    if (!users) {
      errorResponse(res, 404, false, "Failed to fetch users");
    }
    successResponse(res, 200, true, "User find successfully", users);
  } catch (error) {
    next(error);
  }
};

//get user by controller
const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await findUserByProperty("_id", userId);

    if (!user) {
      errorResponse(res, 400, "User not found");
    }
    successResponse(res, 200, "successfully user founded", user);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getUserById };
