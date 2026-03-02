// Routes/v1/blogRoutes.js

const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../../Controllers/blogController");

const checkAdminAuth = require("../../Middleware/adminAuthMW");
const upload = require("../../Middleware/multer");

const blogRoutes = express.Router();

// Admin create blog
blogRoutes.post(
  "/create",
  checkAdminAuth,
  upload.array("media", 5),
  createBlog
);

// Public
blogRoutes.get("/all", getAllBlogs);
blogRoutes.get("/:id", getBlogById);

// Admin update
blogRoutes.put(
  "/update/:id",
  checkAdminAuth,
  upload.array("media", 5),
  updateBlog
);

// Admin delete
blogRoutes.delete("/delete/:id", checkAdminAuth, deleteBlog);

module.exports = blogRoutes;