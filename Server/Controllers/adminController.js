const Service = require("../Models/serviceModel");
const Booking = require("../Models/bookingModel");
const User = require("../Models/userModel");
const AssignedJob = require("../Models/assignedJobModel");
const { hashPassword } = require("../Utilities/passwordUtilities");

const ALLOWED_BOOKING_STATUSES = ["pending", "confirmed", "completed", "cancelled"];
const ALLOWED_ASSIGNED_JOB_STATUSES = ["assigned", "in-progress", "completed"];

// GET ADMIN STATS
exports.getAdminStats = async (req, res) => {
  try {
    const services = await Service.countDocuments();
    const bookings = await Booking.countDocuments();
    const totalUsers = await User.countDocuments({ role: "customer" });
    const workers = await User.countDocuments({ role: "worker" });
    const pending = await Booking.countDocuments({ status: "pending" });

    res.status(200).json({
      services,
      bookings,
      totalUsers,
      workers,
      pending,
    });
  } catch (error) {
    console.error("Admin stats error:", error.message);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

// GET ALL BOOKINGS
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email phone")
      .populate("serviceId", "name price")
      .sort({ createdAt: -1 });

    const bookingIds = bookings.map((booking) => booking._id);

    const assignedJobs = await AssignedJob.find({
      bookingId: { $in: bookingIds },
    })
      .populate("workerId", "name email phone")
      .sort({ updatedAt: -1 });

    const assignedJobMap = new Map();

    for (const job of assignedJobs) {
      const key = String(job.bookingId);
      if (!assignedJobMap.has(key)) {
        assignedJobMap.set(key, job);
      }
    }

    const enrichedBookings = bookings.map((booking) => {
      const key = String(booking._id);
      const assignedJob = assignedJobMap.get(key) || null;

      return {
        ...booking.toObject(),
        assignedJob,
        assignedWorker: assignedJob?.workerId || null,
      };
    });

    res.status(200).json({ bookings: enrichedBookings });
  } catch (error) {
    console.error("Get all bookings error:", error.message);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// UPDATE BOOKING STATUS (ADMIN)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!ALLOWED_BOOKING_STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid booking status" });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
      .populate("userId", "name email phone")
      .populate("serviceId", "name price");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (status === "cancelled" || status === "pending") {
      await AssignedJob.deleteMany({ bookingId: id });
    }

    if (status === "completed") {
      await AssignedJob.updateMany({ bookingId: id }, { status: "completed" });
    }

    res.status(200).json({ message: "Booking status updated", booking });
  } catch (error) {
    console.error("Update booking status error:", error.message);
    res.status(500).json({ message: "Failed to update booking status" });
  }
};

// ASSIGN / REASSIGN BOOKING TO WORKER (ADMIN)
exports.assignBookingToWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const { workerId } = req.body;

    if (!workerId) {
      return res.status(400).json({ message: "workerId is required" });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (["completed", "cancelled"].includes(booking.status)) {
      return res.status(400).json({
        message: "Cannot assign a booking that is completed or cancelled",
      });
    }

    const worker = await User.findOne({ _id: workerId, role: "worker" }).select(
      "name email phone"
    );

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    const assignedJob = await AssignedJob.findOneAndUpdate(
      { bookingId: id },
      { workerId, status: "assigned" },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).populate("workerId", "name email phone");

    if (booking.status === "pending") {
      booking.status = "confirmed";
      await booking.save();
    }

    res.status(200).json({
      message: "Worker assigned successfully",
      assignedJob,
    });
  } catch (error) {
    console.error("Assign worker error:", error.message);
    res.status(500).json({ message: "Failed to assign worker" });
  }
};

// DELETE BOOKING (ADMIN)
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await AssignedJob.deleteMany({ bookingId: id });

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Delete booking error:", error.message);
    res.status(500).json({ message: "Failed to delete booking" });
  }
};

// GET ALL WORKERS
exports.getAllWorkers = async (req, res) => {
  try {
    const workers = await User.find({ role: "worker" })
      .select("name email phone address profilePic createdAt")
      .sort({ createdAt: -1 });

    res.status(200).json({ workers });
  } catch (error) {
    console.error("Get workers error:", error.message);
    res.status(500).json({ message: "Failed to fetch workers" });
  }
};

// GET ASSIGNED JOB TRACKER (ADMIN)
exports.getAssignedJobsTracker = async (req, res) => {
  try {
    const jobs = await AssignedJob.find()
      .populate("workerId", "name email phone")
      .populate({
        path: "bookingId",
        populate: [
          { path: "userId", select: "name email phone" },
          { path: "serviceId", select: "name price" },
        ],
      })
      .sort({ updatedAt: -1 });

    const summary = {
      total: jobs.length,
      assigned: jobs.filter((job) => job.status === "assigned").length,
      inProgress: jobs.filter((job) => job.status === "in-progress").length,
      completed: jobs.filter((job) => job.status === "completed").length,
    };

    res.status(200).json({ jobs, summary });
  } catch (error) {
    console.error("Get assigned jobs tracker error:", error.message);
    res.status(500).json({ message: "Failed to fetch assigned jobs" });
  }
};

// UPDATE ASSIGNED JOB STATUS (ADMIN)
exports.updateAssignedJobStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!ALLOWED_ASSIGNED_JOB_STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid assigned job status" });
    }

    const job = await AssignedJob.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate({
      path: "bookingId",
      populate: [{ path: "userId", select: "name email phone" }, { path: "serviceId", select: "name price" }],
    });

    if (!job) {
      return res.status(404).json({ message: "Assigned job not found" });
    }

    if (job.bookingId) {
      if (status === "completed") {
        job.bookingId.status = "completed";
      } else if (job.bookingId.status === "completed") {
        job.bookingId.status = "confirmed";
      }
      await job.bookingId.save();
    }

    res.status(200).json({ message: "Assigned job status updated", job });
  } catch (error) {
    console.error("Update assigned job status error:", error.message);
    res.status(500).json({ message: "Failed to update assigned job status" });
  }
};

// CREATE WORKER (ADMIN)
exports.createWorker = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        message: "name, email, password and phone are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const worker = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role: "worker",
    });

    res.status(201).json({
      message: "Worker created successfully",
      worker: {
        _id: worker._id,
        name: worker.name,
        email: worker.email,
        phone: worker.phone,
        address: worker.address,
        role: worker.role,
      },
    });
  } catch (error) {
    console.error("Create worker error:", error.message);
    res.status(500).json({ message: "Failed to create worker" });
  }
};

// UPDATE WORKER (ADMIN)
exports.updateWorker = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, password } = req.body;

    const worker = await User.findOne({ _id: id, role: "worker" });
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    if (email && email !== worker.email) {
      const existing = await User.findOne({ email, _id: { $ne: id } });
      if (existing) {
        return res.status(400).json({ message: "Email already in use" });
      }
      worker.email = email;
    }

    if (name !== undefined) worker.name = name;
    if (phone !== undefined) worker.phone = phone;
    if (address !== undefined) worker.address = address;

    if (password) {
      worker.password = await hashPassword(password);
    }

    await worker.save();

    res.status(200).json({
      message: "Worker updated successfully",
      worker: {
        _id: worker._id,
        name: worker.name,
        email: worker.email,
        phone: worker.phone,
        address: worker.address,
        role: worker.role,
      },
    });
  } catch (error) {
    console.error("Update worker error:", error.message);
    res.status(500).json({ message: "Failed to update worker" });
  }
};

// DELETE WORKER (ADMIN)
exports.deleteWorker = async (req, res) => {
  try {
    const { id } = req.params;

    const worker = await User.findOne({ _id: id, role: "worker" });
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    const activeJobs = await AssignedJob.countDocuments({
      workerId: id,
      status: { $in: ["assigned", "in-progress"] },
    });

    if (activeJobs > 0) {
      return res.status(400).json({
        message:
          "Worker has active assigned jobs. Reassign or complete those jobs before deletion.",
      });
    }

    await AssignedJob.deleteMany({ workerId: id });
    await User.deleteOne({ _id: id });

    res.status(200).json({ message: "Worker deleted successfully" });
  } catch (error) {
    console.error("Delete worker error:", error.message);
    res.status(500).json({ message: "Failed to delete worker" });
  }
};
