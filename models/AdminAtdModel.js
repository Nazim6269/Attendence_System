const { model, Schema } = require("mongoose");

const adminAttendenceSchema = new Schema({
  timeLimit: Number,
  status: String,
  createdAt: Date,
});

const AdminAttendence = model("AdminAttendence", adminAttendenceSchema);

module.exports = AdminAttendence;
