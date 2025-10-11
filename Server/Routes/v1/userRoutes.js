const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} = require("../../Controllers/userController");
const checkAdminAuth = require("../../Middleware/adminAuthMW");
const { authMiddleware } = require("../../Middleware/authMiddleware");
const { fieldsValidation } = require("../../Middleware/fieldsValidation");
const upload = require("../../Middleware/multer");



const userRoutes = require('express').Router();

// Auth
userRoutes.post("/register",fieldsValidation(["name", "email", "password"]), registerUser);
userRoutes.post("/login",fieldsValidation([ "email", "password"]), loginUser);

// Users
userRoutes.get("/profile", authMiddleware, getUserProfile);
// userRoutes.get("/", getAllUsers);
// userRoutes.get("/:id", getUserById);
userRoutes.put("/update",authMiddleware, upload.single("profilePic"),updateUserProfile);
userRoutes.delete("/delete/",authMiddleware, deleteUser);


// Admin creates a worker
userRoutes.post("/createWorker", checkAdminAuth, fieldsValidation(["name", "email", "password", "phone"]), registerUser);


module.exports = userRoutes;


