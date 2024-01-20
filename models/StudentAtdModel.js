const { model, Schema } = require("mongoose");

const studentAttendenceSchema = new Schema({
  createdAt: Date,
  user: {
    type: Schema.Types.ObjectId,
    type: "User",
  },
  adminAttendence: {
    type: Schema.Types.ObjectId,
    type: "AdminAttendence",
  },
});

const StudentAttendence = model("StudentAttendence", studentAttendenceSchema);

module.exports = StudentAttendence;
