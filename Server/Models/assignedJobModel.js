const mongoose = require("mongoose");

const assignedJobSchema = new mongoose.Schema(
  {
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    workerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["assigned", "in-progress", "completed"],
      default: "assigned",
    },
    workerNotes: String,
    completionImages: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("AssignedJob", assignedJobSchema);