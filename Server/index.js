const express = require("express");
const dotenv = require("dotenv");
const { dbConnection } = require("./config/dbConnection");
const router = require("./Routes");

dotenv.config();

const app = express();

// ================= Middleware =================
app.use(express.json()); // Parse JSON requests

// ================= DB Connection ==============
dbConnection();

// Health Check Route
app.get("/", (req, res) => {
  console.log("💡 Health check hit");
  res.status(200).json({
    status: "success",
    message: "🚀 Dr. Clean API is running...",
  });
});

// ================= Routes =====================
app.use("/api", router);


// ================= Global Error Handler =================
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const errormessage = error.message || "Internal Server Error";

  console.error("🔥 Global Error Handler:", errormessage);

  res.status(statusCode).json({ error: errormessage });
});

// ================= Server Start =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, (error) => {
  if (error) {
    console.error("❌ Server error: ", error);
  } else {
    console.log("--------------------------------------------------");
    console.log(`🚀 Server is running --> http://localhost:${PORT}`);
    console.log("--------------------------------------------------");
  }
});
