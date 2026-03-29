const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { createBooking } = require("../controller/booking");
router.post("/", auth, createBooking);
module.exports = router;
