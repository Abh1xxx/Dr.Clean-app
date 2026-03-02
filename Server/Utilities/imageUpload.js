
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const uploadToCloudinary = async (filePath, folderName) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
    });

    // Optional: delete local temp file after upload
    fs.unlinkSync(filePath);

    return result.secure_url;
  } catch (error) {
    console.error("❌ Cloudinary Upload Error:", error.message);
    throw error;
  }
};

module.exports = uploadToCloudinary;