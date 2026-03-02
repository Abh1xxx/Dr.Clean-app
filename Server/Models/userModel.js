const defaultAvatars = [
  "https://res.cloudinary.com/dvgz6hz6h/image/upload/v1745401876/avatar3_dua54m.jpg",
  "https://res.cloudinary.com/dvgz6hz6h/image/upload/v1745401878/defalutAvatar_svvxyt.jpg",
  "https://res.cloudinary.com/dvgz6hz6h/image/upload/v1745401875/avatar2_axvpfz.jpg",
];

// Randomly pick one avatar from the array
const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * defaultAvatars.length);
  return defaultAvatars[randomIndex];
};

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    address: { type: String },
    role: {
      type: String,
      enum: ["customer", "admin", "worker"],
      default: "customer",
    },
    // assignedJobs: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Booking",
    //   },
    // ],

    profilePic: {
      type: String,
      default: getRandomAvatar(), // Use the random avatar function
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
