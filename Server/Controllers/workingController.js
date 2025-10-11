const workModel = require("../Models/workModel");
const uploadToCloudinary = require("../Utilities/imageUpload");

// Create a new work post (Admin only)
const createWork = async (req, res, next) => {
  try {
    console.log("📌 [createWork] Triggered by:", req.user?.name || req.user?._id);

    const { title, description } = req.body;
    console.log("📝 Work Details:", { title, description });

    // Collect uploaded images
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      console.log(`📂 ${req.files.length} file(s) received`);
      for (const file of req.files) {
        console.log("⬆️ Uploading to Cloudinary:", file.originalname);
        const result = await uploadToCloudinary(file.path, "DrClean/works");
        console.log("✅ Uploaded:", result);
        imageUrls.push(result);
      }
    } else {
      console.log("⚠️ No files uploaded");
    }

    const work = new workModel({
      title,
      description,
      images: imageUrls,
      createdBy: req.user, // from auth middleware
    });

    await work.save();
    console.log("💾 Work saved:", work._id);

    res.status(201).json({ success: true, work });
  } catch (error) {
    console.error("❌ Error in createWork:", error.message);
    next(error);
  }
};

// Get all work posts (Public)
const getAllWorks = async (req, res, next) => {
  try {
    console.log("📌 [getAllWorks] Fetching all works...");
    const works = await workModel.find().populate("createdBy", "name email");
    console.log(`✅ ${works.length} works found`);
    res.status(200).json({ success: true, works });
  } catch (error) {
    console.error("❌ Error in getAllWorks:", error.message);
    next(error);
  }
};

// Get single work post
const getWorkById = async (req, res, next) => {
  try {
    console.log("📌 [getWorkById] ID:", req.params.id);
    const work = await workModel.findById(req.params.id).populate("createdBy", "name email");
    if (!work) {
      console.warn("⚠️ Work not found:", req.params.id);
      return res.status(404).json({ success: false, message: "Work not found" });
    }

    console.log("✅ Work found:", work._id);
    res.status(200).json({ success: true, work });
  } catch (error) {
    console.error("❌ Error in getWorkById:", error.message);
    next(error);
  }
};

// Delete work post (Admin only)
const deleteWork = async (req, res, next) => {
  try {
    console.log("📌 [deleteWork] ID:", req.params.id);
    const work = await workModel.findByIdAndDelete(req.params.id);
    if (!work) {
      console.warn("⚠️ Work not found for deletion:", req.params.id);
      return res.status(404).json({ success: false, message: "Work not found" });
    }

    console.log("🗑️ Work deleted:", work._id);
    res.status(200).json({ success: true, message: "Work deleted" });
  } catch (error) {
    console.error("❌ Error in deleteWork:", error.message);
    next(error);
  }
};

module.exports = { createWork, getAllWorks, getWorkById, deleteWork };
