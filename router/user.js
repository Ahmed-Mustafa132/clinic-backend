const express = require("express");
const router = express.Router();
const {
  getAllusers,
  register,
  updateuser,
  login,
  deleteuser,
  addDoctor,
  getDoctors,
} = require("../controller/user");
router.get("/getallusers", getAllusers);  
router.post("/login", login);
router.post("/register", register);
router.put("/update", updateuser);
router.delete("/delete", deleteuser);
router.post("/add-doctor", addDoctor);
router.get("/doctors", getDoctors);

module.exports = router;
