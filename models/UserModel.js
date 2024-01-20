const { model, Schema } = require("mongoose");

const userModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  acoountStatus: {
    type: String,
  },
  Role: {
    type: [String],
  },
});

const User = model("User", userModel);

module.exports = User;
