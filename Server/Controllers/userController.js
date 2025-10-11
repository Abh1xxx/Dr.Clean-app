// const bcrypt = require("bcrypt");
const userModel = require("../Models/userModel");
const uploadToCloudinary = require("../Utilities/imageUpload");
const createToken = require("../Utilities/loginToken");
const { hashPassword, comparePassword } = require("../Utilities/passwordUtilities");

// @desc    Register a new user
// @route   POST /api/v1/users/register
const registerUser = async (req, res, next) => {
  try {
    console.log("🟢 [Register User] API hit");

    const { name, email, password, phone, role,address } = req.body;
    console.log(`📩 Received Data -> Name: ${name}, Email: ${email}`);

    // Check if user already exists
    console.log("🔍 Checking if user already exists...");
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      console.log("❌ User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    console.log("🆕 Creating new user...");
    const newUser = new userModel({
      name,
      email,
      phone,
      address,
      role: role || "customer",
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log("✅ User registered successfully:", savedUser._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        address:savedUser.address
      },
    });
  } catch (error) {
    console.error("❌ Error in registerUser:", error);
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/v1/users/login
const loginUser = async (req, res, next) => {
  try {
    console.log("🟢 [Login User] API hit");

    const { email, password } = req.body;
    console.log("🔐 Login attempt for:", email);

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      console.log("❌ Incorrect password for:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Convert to object & remove password
    const userObject = user.toObject();
    delete userObject.password;

     const role = user.role;

    // Generate JWT
    const token = createToken(user._id, user.role);

    console.log("✅ Login successful for user:", user.name, "| ID:", user._id,"|  Role:", role);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userObject,
    });
  } catch (error) {
    console.error("🚨 Error in loginUser:", error);
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/v1/users/profile
const getUserProfile = async (req, res, next) => {
  try {
    console.log("🟢 [Get User Profile] API hit");
    console.log("📌 Request User ID:", req.user);

    const user = await userModel.findById(req.user).select("-password");

    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User profile retrieved:", user._id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("❌ Error in getUserProfile:", error);
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
const updateUserProfile = async (req, res, next) => {
  try {
    console.log("🟢 [Update User Profile] API hit-->",req.body);

    const { name, email, phone,address } = req.body;
    let profilePicUrl;

    // Upload new profile picture if provided
    if (req.file) {
      console.log("📤 Uploading new profile picture to Cloudinary...");
      profilePicUrl = await uploadToCloudinary(
        req.file.path,
        "Dr.Clean DP"
      );
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user,
      {
        name,
        email,
        phone,
        address,
        ...(profilePicUrl && { profilePic: profilePicUrl }),
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      console.log("❌ User not found for update");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ Profile updated:", updatedUser._id);
    res
      .status(200)
      .json({ success: true, user: updatedUser, message: "Profile updated successfully" });
  } catch (error) {
    console.error("❌ Error in updateUserProfile:", error);
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/v1/users/profile
const deleteUser = async (req, res, next) => {
  try {
    console.log("🟢 [Delete User] API hit");
    console.log(`🔹 Delete request for user ID: ${req.user}`);

    const deletedUser = await userModel.findByIdAndDelete(req.user);

    if (!deletedUser) {
      console.log("❌ User not found for deletion");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ User deleted successfully:", req.user);
    res
      .status(200)
      .json({ success: true, message: "User account deleted successfully" });
  } catch (error) {
    console.error("🚨 Error in deleteUser:", error);
    next(error);
  }
};


module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser, 
};
