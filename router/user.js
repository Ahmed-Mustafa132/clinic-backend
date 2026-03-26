const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  register,
  updataUser,
  login,
} = require("../controller/user");
router.get("/getallusers", getAllUsers);
router.post("/login", login);
router.post("/register", register);
router.put("/update", updataUser);
module.exports = router;
