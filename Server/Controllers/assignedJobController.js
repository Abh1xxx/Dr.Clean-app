const AssignedJob = require("../Models/assignedJobModel");

const getWorkerJobs = async (req, res, next) => {
  try {
    const jobs = await AssignedJob.find({ workerId: req.user })
      .populate("bookingId")
      .populate("workerId", "name email");

    res.status(200).json({ success: true, jobs });
  } catch (error) {
    next(error);
  }
};

const updateJobStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!["assigned", "in-progress", "completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const job = await AssignedJob.findOneAndUpdate(
      { _id: req.params.id, workerId: req.user },
      { status },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ success: true, job });
  } catch (error) {
    next(error);
  }
};

module.exports = { getWorkerJobs, updateJobStatus };