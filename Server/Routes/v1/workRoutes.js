const express = require("express");
const { createWork, getAllWorks, getWorkById, deleteWork } = require("../../Controllers/workingController");
const checkAdminAuth = require("../../Middleware/adminAuthMW");
const upload = require("../../Middleware/multer");

const workRoutes = express.Router();

// Admin creates work
workRoutes.post("/createWork",checkAdminAuth,upload.array("images", 5),  createWork);

// // Public can view works
workRoutes.get("/getAllWorks", getAllWorks);
workRoutes.get("/getWorkById/:id", getWorkById);

// // Admin deletes work
workRoutes.delete("/deleteWork/:id", checkAdminAuth, deleteWork);

module.exports = workRoutes;
