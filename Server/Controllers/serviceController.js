const serviceModel = require("../Models/serviceModel");
const uploadToCloudinary = require("../Utilities/imageUpload");

// Create a new service (Admin)
const createService = async (req, res, next) => {
  try {
    console.log("👉 [createService] Request body:", req.body);
    console.log("👉 [createService] Uploaded file:", req.file);

    const { name, description, price } = req.body;

    let imageUrl = "";
    if (req.file) {
      console.log("⚡ Uploading image to Cloudinary...");
      imageUrl = await uploadToCloudinary(req.file.path, "Dr.Clean Services");
      console.log("✅ Image uploaded to Cloudinary:", imageUrl);
    }

    const service = new serviceModel({
      name,
      description,
      price,
      image: imageUrl,
    });

    await service.save();
    console.log("✅ New Service Created:", service);

    res.status(201).json({ success: true, service });
  } catch (error) {
    console.error("❌ [createService] Error:", error.message);
    next(error);
  }
};

// Get all services
const getAllServices = async (req, res, next) => {
  try {
    console.log("👉 [getAllServices] Fetching all services...");
    const services = await serviceModel.find();
    console.log(`✅ Found ${services.length} services`);
    res.status(200).json({ success: true, services });
  } catch (error) {
    console.error("❌ [getAllServices] Error:", error.message);
    next(error);
  }
};

// Get single service
const getServiceById = async (req, res, next) => {
  try {
    console.log("👉 [getServiceById] Requested ID:", req.params.id);
    const service = await serviceModel.findById(req.params.id);

    if (!service) {
      console.warn("⚠️ Service not found with ID:", req.params.id);
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    console.log("✅ Found Service:", service);
    res.status(200).json({ success: true, service });
  } catch (error) {
    console.error("❌ [getServiceById] Error:", error.message);
    next(error);
  }
};

// Update service (Admin)
const updateService = async (req, res, next) => {
  try {
    console.log("👉 [updateService] Updating ID:", req.params.id);
    console.log("👉 [updateService] Request body:", req.body);
    console.log("👉 [updateService] Uploaded file:", req.file);

    const { name, description, price } = req.body;
    let updateData = { name, description, price };

    if (req.file) {
      console.log("⚡ Uploading updated image to Cloudinary...");
      const imageUrl = await uploadToCloudinary(req.file.path, "DrClean Services");
      updateData.image = imageUrl;
      console.log("✅ New image uploaded:", imageUrl);
    }

    const service = await serviceModel.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!service) {
      console.warn("⚠️ Service not found with ID:", req.params.id);
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    console.log("✅ Service Updated:", service);
    res.status(200).json({ success: true, service });
  } catch (error) {
    console.error("❌ [updateService] Error:", error.message);
    next(error);
  }
};

// Delete service (Admin)
const deleteService = async (req, res, next) => {
  try {
    console.log("👉 [deleteService] Deleting ID:", req.params.id);
    const service = await serviceModel.findByIdAndDelete(req.params.id);

    if (!service) {
      console.warn("⚠️ Service not found with ID:", req.params.id);
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    console.log("✅ Service Deleted:", req.params.id);
    res.status(200).json({ success: true, message: "Service deleted" });
  } catch (error) {
    console.error("❌ [deleteService] Error:", error.message);
    next(error);
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
