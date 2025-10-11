const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel');

const checkAdminAuth = async (req, res, next) => {
    try {
        console.log("🛡️ Admin Auth Middleware Triggered");

        const authHeader = req.headers.authorization;
        const authToken = authHeader && authHeader.split(" ")[1];

        if (!authToken) {
            console.log("❌ No Token Provided");
            return res.status(401).json({ status: false, message: "Unauthorized access" });
        }

        // Verify token
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);

        // Check if user exists and has admin role
        const user = await userModel.findById(decoded.id);
        if (!user) {
            console.log("❌ User not found");
            return res.status(404).json({ status: false, message: "User not found" });
        }

        if (user.role !== 'admin') {
            console.log("❌ Access Denied - Not an Admin");
            return res.status(403).json({ status: false, message: "Access denied. Admins only." });
        }

        console.log("✅ Admin Verified:", user.name);
        req.user = decoded.id;
        next();

    } catch (error) {
        console.error("❌ Admin Auth Error:", error.message);
        return res.status(401).json({ status: false, message: "Invalid token" });
    }
};

module.exports = checkAdminAuth;
