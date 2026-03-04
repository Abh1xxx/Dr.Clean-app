// const express = require("express");
// const dotenv = require("dotenv");
// const { dbConnection } = require("./config/dbConnection");
// const router = require("./Routes");
// const cors = require("cors");

// dotenv.config();

// const app = express();

// // ================= Middleware =================
// app.use(express.json()); // Parse JSON requests

// const normalizeOrigin = (value = "") => value.trim().replace(/\/+$/, "");

// const allowedOrigins = (
//   process.env.CLIENT_URLS || process.env.CLIENT_URL || "http://localhost:5173,http://127.0.0.1:5173"
// )
//   .split(",")
//   .map((origin) => normalizeOrigin(origin))
//   .filter(Boolean);

// const isVercelOrigin = (origin = "") => {
//   try {
//     const { hostname } = new URL(origin);
//     return hostname.endsWith(".vercel.app");
//   } catch (error) {
//     return false;
//   }
// };

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       const requestOrigin = normalizeOrigin(origin || "");

//       if (!origin || allowedOrigins.includes(requestOrigin) || isVercelOrigin(requestOrigin)) {
//         return callback(null, true);
//       }

//       // Deny cross-origin requests without turning preflight into a 500 error.
//       return callback(null, false);
//     },
//     credentials: true,
//   })
// );

// // ================= DB Connection ==============
// dbConnection();

// // Health Check Route
// app.get("/", (req, res) => {
//   console.log("💡 Health check hit");
//   res.status(200).json({
//     status: "success",
//     message: "🚀 Dr. Clean API is running...",
//   });
// });

// // ================= Routes =====================
// app.use("/api", router);

// // ================= Global Error Handler =================
// app.use((error, req, res, next) => {
//   const statusCode = error.statusCode || 500;
//   const errormessage = error.message || "Internal Server Error";

//   console.error("🔥 Global Error Handler:", errormessage);

//   res.status(statusCode).json({ error: errormessage });
// });

// // ================= Server Start =================
// if (process.env.VERCEL !== "1") {
//   const PORT = process.env.PORT || 5000;

//   app.listen(PORT, (error) => {
//     if (error) {
//       console.error("Server error:", error);
//     } else {
//       console.log("--------------------------------------------------");
//       console.log(`Server is running --> http://localhost:${PORT}`);
//       console.log("--------------------------------------------------");
//     }
//   });
// }

// module.exports = app;

const express = require("express");
const dotenv = require("dotenv");
const { dbConnection } = require("./config/dbConnection");
const router = require("./Routes");
const cors = require("cors");

dotenv.config();

const app = express();

// ================= Middleware =================
app.use(express.json());

// CORS configuration
// app.use(
//   cors({
//     origin: [
//       "https://dr-clean-app-x78g.vercel.app",
//       "http://localhost:5173"
//     ],
//     credentials: true,
//   })
// );

app.use(cors({
  origin: "*"
}));


// ================= DB Connection ==============
dbConnection();

// ================= Health Check ==============
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
    console.error("❌ Server error:", error);
  } else {
    console.log("--------------------------------------------------");
    console.log(`🚀 Server is running --> http://localhost:${PORT}`);
    console.log("--------------------------------------------------");
  }
});
