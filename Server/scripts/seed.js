require("dotenv").config();
const mongoose = require("mongoose");

const User = require("../Models/userModel");
const Service = require("../Models/serviceModel");
const Blog = require("../Models/blogModel");
const { hashPassword } = require("../Utilities/passwordUtilities");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    const existingServices = await Service.countDocuments();
    const existingBlogs = await Blog.countDocuments();

    let adminUser = await User.findOne({ email: "admin@drclean.com" });
    if (!adminUser) {
      const adminPassword = await hashPassword("Admin@123");
      adminUser = await User.create({
        name: "Dr Clean Admin",
        email: "admin@drclean.com",
        password: adminPassword,
        phone: "9999999999",
        address: "Main Office",
        role: "admin",
      });
      console.log("Created admin: admin@drclean.com / Admin@123");
    }

    let customerUser = await User.findOne({ email: "abhiram@gmail.com" });
    if (!customerUser) {
      const customerPassword = await hashPassword("User@123");
      customerUser = await User.create({
        name: "Abhiram",
        email: "abhiram@gmail.com",
        password: customerPassword,
        phone: "9888888888",
        address: "Alappuzha",
        role: "customer",
      });
      console.log("Created customer: abhiram@gmail.com / User@123");
    }

    if (existingServices === 0) {
      await Service.insertMany([
        {
          name: "Deep Home Cleaning",
          description: "Complete deep cleaning for living room, kitchen, and bedrooms.",
          price: 1999,
          image: "",
        },
        {
          name: "Office Cleaning",
          description: "Professional office sanitization and workspace cleaning.",
          price: 2499,
          image: "",
        },
        {
          name: "Water Tank Cleaning",
          description: "Safe and hygienic underground and overhead tank cleaning.",
          price: 1499,
          image: "",
        },
      ]);
      console.log("Inserted 3 services.");
    }

    if (existingBlogs === 0) {
      await Blog.insertMany([
        {
          title: "Apartment Deep Cleaning Completed",
          caption: "Our team completed a full apartment deep cleaning with kitchen degreasing and bathroom sanitization.",
          media: [],
          status: "published",
          createdBy: adminUser._id,
        },
        {
          title: "Office Weekend Cleaning Project",
          caption: "Weekend office cleanup completed including floor polishing and workstation dust removal.",
          media: [],
          status: "published",
          createdBy: adminUser._id,
        },
      ]);
      console.log("Inserted 2 blogs.");
    }

    const counts = {
      users: await User.countDocuments(),
      services: await Service.countDocuments(),
      blogs: await Blog.countDocuments(),
    };

    console.log("Seed complete:", counts);
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err.message);
    process.exit(1);
  }
}

seed();
