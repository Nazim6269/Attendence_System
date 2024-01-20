const mongoose = require("mongoose");
const connectDb = async (URL) => {
  try {
    await mongoose.connect(URL);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
