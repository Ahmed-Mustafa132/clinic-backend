const { createDepartment } = require("../controller/department");
const { Router } = require("express");
const router = Router();

router.post("/", createDepartment);
module.exports = router;
