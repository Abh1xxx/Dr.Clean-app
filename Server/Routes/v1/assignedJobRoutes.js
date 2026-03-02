const express = require("express");
const { authMiddleware } = require("../../Middleware/authMiddleware");
const {
  getWorkerJobs,
  updateJobStatus,
} = require("../../Controllers/assignedJobController");

const assignedJobRoutes = express.Router();

assignedJobRoutes.get("/my-jobs", authMiddleware, getWorkerJobs);
assignedJobRoutes.put("/update-status/:id", authMiddleware, updateJobStatus);

module.exports = assignedJobRoutes;