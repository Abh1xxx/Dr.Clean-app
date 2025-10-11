const mongoose = require("mongoose");

const workSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }], // store image URLs
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Admin user
  },
  { timestamps: true }
);

module.exports = mongoose.model("Work", workSchema);
