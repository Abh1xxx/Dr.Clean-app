const express = require("express");
const v1Router = require("./v1");

const router = express.Router();

// All v1  routes start with /api
router.use("/v1", v1Router);

module.exports = router;
