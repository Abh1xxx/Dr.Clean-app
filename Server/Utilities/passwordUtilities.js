const bcrypt = require("bcrypt");

// Hash password
const hashPassword = async (password) => {
    console.log("🔑 Hashing password...");
    const salt = await bcrypt.genSalt(10); // generates a salt with 10 rounds
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("✅ Password hashed successfully.");
    return hashedPassword};

// Compare password
const comparePassword = async (enteredPassword, hashedPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
