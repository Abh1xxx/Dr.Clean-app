const express = require("express");
const {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBookingStatus,
  assignBookingToWorker,
} = require("../../Controllers/bookingController");
const { authMiddleware } = require("../../Middleware/authMiddleware");
const checkAdminAuth = require("../../Middleware/adminAuthMW");

const bookingRoutes = express.Router();

// 📌 Create new booking
bookingRoutes.post("/createBooking", authMiddleware, createBooking);

// 📌 Get all bookings (Admin)
bookingRoutes.get("/getAllBookings", authMiddleware, checkAdminAuth, getAllBookings);

// 📌 Get bookings of a specific user
bookingRoutes.get("/getUserBookings", authMiddleware, getUserBookings);

// 📌 Update booking status (Admin)
bookingRoutes.put("/update/:id", authMiddleware, checkAdminAuth, updateBookingStatus);

// 📌 Assign a booking to a worker (Admin only)
bookingRoutes.post(
  "/assignWorker",
  authMiddleware,
  checkAdminAuth,
  assignBookingToWorker
);


module.exports = bookingRoutes;
