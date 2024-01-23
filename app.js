const express = require("express");
const bcrypt = require("bcryptjs");
const connectDb = require("./helpers/dbConnect");
const jwt = require("jsonwebtoken");
const User = require("./models/UserModel");
const { errorResponse, successResponse } = require("./helpers/response");
const { serverPort, jwtSecretKey, dbURL } = require("./secret");
const morgan = require("morgan");
const { authenticate } = require("./middlewares/authenticate");
const app = express();

//middleware Array
const middlewareArray = [morgan("dev"), express.json()];

//use middleware
app.use(middlewareArray);

app.get("/private", authenticate, async (_req, res, _next) => {
  successResponse(res, 200, "I am private route");
});

app.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    errorResponse(res, 400, "Insufficeint Data");
  }
  try {
    let user = new User({ name, password, email });

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    user.password = hashedPass;
    await user.save();

    successResponse(res, 201, "User created Successfuly");
  } catch (error) {
    next(error);
  }
});

//TODO: Refactoreing korte hobe

app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      errorResponse(res, 400, "Invalid Credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      errorResponse(res, 400, "Invalid Credentials");
    }
    delete user._doc.password;
    //create token
    const token = jwt.sign(user._doc, jwtSecretKey, { expiresIn: "2h" });
    successResponse(res, 200, "Successfully Login", token);
  } catch (error) {
    next(error);
  }
});

//server error handler
app.use((error, _req, res, _next) => {
  console.log(error);
  errorResponse(res, 500, "Server error occured");
});

//app is linstening here
connectDb(dbURL).then(() => {
  console.log("DB connected Successfully");
  app.listen(serverPort, () => {
    console.log(
      `Server is running successfylly at http://localhost:${serverPort}`
    );
  });
});
