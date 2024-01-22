const { model, Schema } = require("mongoose");

const userModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: [6, "Password is too short"],

    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: (props) => `${props.vlaue}`,
    },
  },
  acoountStatus: {
    type: String,
    enum: ["ACTIVE", "PENDING", "REJECTED"],
    default: "PENDING",
    required: true,
  },
  role: {
    type: [String],
    required: true,
    default: ["STUDENT"],
  },
});

const User = model("User", userModel);

module.exports = User;
