// Controllers/blogController.js

const blogModel = require("../Models/blogModel");
const uploadToCloudinary = require("../Utilities/imageUpload");

// ================= CREATE BLOG (Admin Only) =================
const createBlog = async (req, res, next) => {
  try {
    const { title, caption, status } = req.body;
    console.log("FILES:", req.files);
    let mediaArray = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadedUrl = await uploadToCloudinary(
          file.path,
          "DrClean/blogs"
        );

        mediaArray.push({
          url: uploadedUrl,
          type: file.mimetype.startsWith("video") ? "video" : "image",
        });
      }
    }

    const blog = new blogModel({
      title,
      caption,
      media: mediaArray,
      status,
      createdBy: req.user,
    });

    await blog.save();

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error("❌ createBlog Error:", error.message);
    next(error);
  }
};

// ================= GET ALL BLOGS (Public) =================
const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await blogModel
      .find({ status: "published" })
      .populate("createdBy", "name");

    res.status(200).json({ success: true, blogs });
  } catch (error) {
    console.error("❌ getAllBlogs Error:", error.message);
    next(error);
  }
};

// ================= GET SINGLE BLOG =================
const getBlogById = async (req, res, next) => {
  try {
    const blog = await blogModel
      .findById(req.params.id)
      .populate("createdBy", "name");

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error("❌ getBlogById Error:", error.message);
    next(error);
  }
};

// ================= UPDATE BLOG (Admin) =================
const updateBlog = async (req, res, next) => {
  try {
    const { title, caption, status } = req.body;

    const blog = await blogModel.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.title = title || blog.title;
    blog.caption = caption || blog.caption;
    blog.status = status || blog.status;

    if (req.files && req.files.length > 0) {
      let mediaArray = [];

      for (const file of req.files) {
        const uploadedUrl = await uploadToCloudinary(
          file.path,
          "DrClean/blogs"
        );

        mediaArray.push({
          url: uploadedUrl,
          type: file.mimetype.startsWith("video") ? "video" : "image",
        });
      }

      blog.media = mediaArray;
    }

    await blog.save();

    res.status(200).json({
      success: true,
      message: "Blog updated",
      blog,
    });
  } catch (error) {
    console.error("❌ updateBlog Error:", error.message);
    next(error);
  }
};

// ================= DELETE BLOG (Admin) =================
const deleteBlog = async (req, res, next) => {
  try {
    const blog = await blogModel.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("❌ deleteBlog Error:", error.message);
    next(error);
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};