const { model, Schema } = require("mongoose");

const profileModel = new Schema({
  fistName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Profile = model("Profile", profileModel);

module.exports = Profile;
