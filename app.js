require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const connectDb = require("./helpers/dbConnect");
const User = require("./models/UserModel");
const { errorResponse, successResponse } = require("./helpers/response");
const PORT = process.env.SERVER_PORT || 3333;

const mongoURL = process.env.MONGO_URL;

const app = express();
app.use(express.json());

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
    successResponse(res, 200, "Successfully Login", user);
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
connectDb(mongoURL).then(() => {
  console.log("DB connected Successfully");
  app.listen(PORT, () => {
    console.log(`Server is running successfylly at http://localhost:${PORT}`);
  });
});
