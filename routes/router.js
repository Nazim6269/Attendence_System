//external imports
const router = require("express").Router();
//internal imports
const {
  privateController,
  registerController,
  loginController,
} = require("../controllers/authController");
const { authenticate } = require("../middlewares/authenticate");

router.get("/private", authenticate, privateController);
router.post("/register", registerController);
router.post("/login", loginController);

module.exports = { router };
