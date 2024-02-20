const { successResponse, errorResponse } = require("../helpers/response");
const { findUsers } = require("../services/userService");

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

module.exports = { getAllUsers };
