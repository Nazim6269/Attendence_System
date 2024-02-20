//external imports
const express = require("express");
const app = express();
const morgan = require("morgan");
//internal imports
const connectDb = require("./helpers/dbConnect");
const { errorResponse } = require("./helpers/response");
const { serverPort, dbURL } = require("./secret");
const router = require("./routes/indexRoue");

//middleware Array
const middlewareArray = [morgan("dev"), express.json()];

//use middleware
app.use(middlewareArray);
app.use(router);

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
      `Server is running successfully at http://localhost:${serverPort}`
    );
  });
});
