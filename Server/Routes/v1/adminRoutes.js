const express = require("express");
const {
  getAdminStats,
  getAllBookings,
  getAllWorkers,
  updateBookingStatus,
  assignBookingToWorker,
  deleteBooking,
  createWorker,
  updateWorker,
  deleteWorker,
} = require("../../Controllers/adminController");
const { authMiddleware } = require("../../Middleware/authMiddleware");

const adminOnly = (req, res, next) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  next();
};

const adminRoutes = express.Router();

adminRoutes.get("/stats", authMiddleware, adminOnly, getAdminStats);
adminRoutes.get("/all-bookings", authMiddleware, adminOnly, getAllBookings);

adminRoutes.get("/workers", authMiddleware, adminOnly, getAllWorkers);
adminRoutes.post("/workers", authMiddleware, adminOnly, createWorker);
adminRoutes.put("/workers/:id", authMiddleware, adminOnly, updateWorker);
adminRoutes.delete("/workers/:id", authMiddleware, adminOnly, deleteWorker);

adminRoutes.put("/bookings/:id/status", authMiddleware, adminOnly, updateBookingStatus);
adminRoutes.put("/bookings/:id/assign", authMiddleware, adminOnly, assignBookingToWorker);
adminRoutes.delete("/bookings/:id", authMiddleware, adminOnly, deleteBooking);

module.exports = adminRoutes;
