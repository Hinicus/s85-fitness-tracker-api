const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "userId is requred"],
  },
  name: {
    type: String,
    required: [true, "name is required"],
  },
  duration: {
    type: String,
    required: [true, "duration is required"],
  },
  status: {
    type: String,
    default: "pending",
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Workout", WorkoutSchema);
