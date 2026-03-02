// Models/blogModel.js

const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },

    caption: {
      type: String,
      required: true,
    },

    media: [
      {
        url: { type: String },
        type: {
          type: String,
          enum: ["image", "video"],
          default: "image",
        },
      },
    ],

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);