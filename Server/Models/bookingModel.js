// models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
 userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
 
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },

  date: { type: String, required: true },

  time: { type: String, required: true },

  address: { type: String, required: true },

  status: { type: String, enum: ["pending", "confirmed", "completed", "cancelled"], 
  default: "pending" 
  },
  rating: { type: Number, min: 1, max: 5 }, // optional, only after completion
  review: { type: String } // optional
}, { timestamps: true });

module.exports =  mongoose.model("Booking", bookingSchema);

