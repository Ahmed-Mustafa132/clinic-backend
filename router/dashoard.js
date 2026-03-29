const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controller/dashoard");
router.get("/", getDashboardStats);
module.exports = router;
