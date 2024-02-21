const { successResponse, errorResponse } = require("../helpers/response");
const {
  findUsersService,
  findUserByPropertyService,
  createUserService,
} = require("../services/userService");

//get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await findUsersService();
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
  const { userId } = req.params;
  try {
    const user = await findUserByPropertyService("_id", userId);

    if (!user) {
      errorResponse(res, 400, "User not found");
    }
    successResponse(res, 200, "successfully user founded", user);
  } catch (error) {
    next(error);
  }
};

//create new user
const postNewUser = async (req, res, next) => {
  const { name, email, password, roles, accountstatus } = req.body;
  try {
    const user = await createUserService(
      name,
      email,
      password,
      roles,
      accountstatus
    );
    if (!user) {
      errorResponse(res, 400, "Failed to creae user");
    }
    successResponse(res, 200, "Successfully created new user", user);
  } catch (error) {
    next(error);
  }
};

//delete user controller
const deleteUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await findUserByPropertyService("_id", userId);

    if (!user) {
      errorResponse(res, 404, "User not found");
    }
    user.remove();
    successResponse(res, 203, "User Deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getUserById, postNewUser, deleteUserById };
