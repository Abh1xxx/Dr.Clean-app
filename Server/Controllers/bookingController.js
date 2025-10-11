// controllers/bookingController.js
const bookingModel = require("../Models/bookingModel");
const userModel = require("../Models/userModel");

// 📌 Create new booking
const createBooking = async (req, res, next) => {
  try {
    console.log("👉 [createBooking] Request body:", req.body);

    const userId = req.user;
    const { serviceId, date, time, address } = req.body;

    const booking = new bookingModel({
      userId,
      serviceId,
      date,
      time,
      address,
      status: "pending",
    });

    await booking.save();
    console.log("✅ Booking created:", booking._id);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("❌ [createBooking] Error:", error.message);
    next(error);
  }
};

// 📌 Get all bookings (admin use)
const getAllBookings = async (req, res, next) => {
  try {
    console.log("👉 [getAllBookings] Fetching all bookings...");

    const bookings = await bookingModel
      .find()
      .populate("userId", "name email phone")
      .populate("serviceId", "name price");

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("❌ [getAllBookings] Error:", error.message);
    next(error);
  }
};

// 📌 Get user bookings
const getUserBookings = async (req, res, next) => {
  try {
    const userId = req.user; // ✅ Extract from authMiddleware
    console.log("👉 [getUserBookings] User ID:", userId);

    const bookings = await bookingModel
      .find({ userId })
      .populate("serviceId", "name price");

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("❌ [getUserBookings] Error:", error.message);
    next(error);
  }
};

const updateBookingStatus = async (req, res, next) => {
  try {
    console.log("👉 [updateBookingStatus] Booking ID:", req.params.id);

    const booking = await bookingModel.findByIdAndUpdate(
      req.params.id,
      req.body, // 👈 this applies everything from request body
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    console.log("✅ Booking updated:", booking._id);
    res.status(200).json({ success: true, booking });
  } catch (error) {
    console.error("❌ [updateBookingStatus] Error:", error.message);
    next(error);
  }
};

// 📌 Assign a booking to a worker (Admin only)
const assignBookingToWorker = async (req, res, next) => {
  try {
    console.log("🟢 [Assign Booking] API hit");

    // ✅ Extract bookingId and workerId from request body
    const { bookingId, workerId } = req.body;
    console.log("📌 Received bookingId:", bookingId, "| workerId:", workerId);

    // 🔍 Find the worker in the database
    const worker = await userModel.findById(workerId);
    console.log(
      "🔍 Worker fetched from DB:",
      worker ? worker.name : "Not found"
    );

    // ❌ Check if worker exists and has role "worker"
    if (!worker || worker.role !== "worker") {
      console.log("❌ Worker not found or invalid role");
      return res
        .status(404)
        .json({ message: "Worker not found or not a worker" });
    }

    // ➕ Add this booking to the worker's assignedJobs array
    worker.assignedJobs.push(bookingId);
    await worker.save(); // save updated worker
    console.log(
      `✅ Booking ${bookingId} added to worker ${worker.name} assignedJobs`
    );

    // 🔄 Find the booking first
    const booking = await bookingModel.findById(bookingId);

    if (!booking) {
      console.log("❌ Booking not found with ID:", bookingId);
      return res.status(404).json({ message: "Booking not found" });
    }

    // ✅ Update booking status to "confirmed"
    booking.status = "confirmed";
    await booking.save();
    console.log(`🔄 Booking ${bookingId} status updated to 'confirmed'`);
 
    // ✅ Respond with updated worker and booking info
    res.status(200).json({
      success: true,
      message: "Booking assigned to worker successfully",
      worker,
      booking,
    });
    console.log("✅ Response sent successfully");
  } catch (error) {
    console.error("❌ Error in assignBookingToWorker:", error);
    next(error);
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getUserBookings,
  updateBookingStatus,
  assignBookingToWorker,
};
