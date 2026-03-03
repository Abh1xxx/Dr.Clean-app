const express = require("express");
const userRoutes = require("./userRoutes");
const ServiceRoutes = require("./serviceRoutes");
const bookingRoutes = require("./bookingRoutes");
const workRoutes = require("./workRoutes");
const assignedJobRoutes = require("./assignedJobRoutes");
const blogRoutes = require("./blogRoutes");
const adminRoutes = require("./adminRoutes");

const v1Router = express.Router();

// v1 routes
v1Router.use("/users", userRoutes);
v1Router.use("/services", ServiceRoutes);
v1Router.use("/bookings", bookingRoutes);
v1Router.use("/works", workRoutes);
v1Router.use("/job",assignedJobRoutes);
v1Router.use("/blogs", blogRoutes);
v1Router.use("/admin", adminRoutes);
module.exports = v1Router;
