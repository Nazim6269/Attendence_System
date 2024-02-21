const {
  getAllUsers,
  getUserById,
  postNewUser,
  deleteUserById,
} = require("../controllers/userController");

const router = require("express").Router();

/**
 * find user by Id or email
 * @route /api/v1/users
 * @method GET
 * @visibility private
 */
router.get("/:userId", getUserById);

/**
 * update user
 * @route /api/v1/users
 * @method POST
 * @visibility private
 */
router.post("/", postNewUser);

/**
 * update user
 * @route /api/v1/users
 * @method PUT
 * @visibility private
 */
router.put("/:userId", () => {});

/**
 * @route /api/v1/users
 * @method PATCH
 * @visibility private
 */
router.patch("/:userId", () => {});

/**
 * delete user
 * @route /api/v1/users
 * @method DELETE
 * @visibility private
 */
router.delete("/:userId", deleteUserById);

/**
 * find all users
 * @route /api/v1/users
 * @method GET
 * @visibility private
 */
router.get("/", getAllUsers);

module.exports = router;
