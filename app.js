require("dotenv").config();
const express = require("express");
const connectDb = require("./helpers/dbConnect");
const { errorResponse, successResponse } = require("./helpers/response");
const PORT = process.env.SERVER_PORT || 3333;

const mongoURL = process.env.MONGO_URL;

const app = express();
app.use(express.json());

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    errorResponse(res, 400, "Insufficeint Data", false);
  }
  successResponse(res, 200, "User created Successfuly", true);
});

connectDb(mongoURL).then(() => {
  console.log("DB connected Successfully");
  app.listen(PORT, () => {
    console.log(`Server is running successfylly at http://localhost:${PORT}`);
  });
});
