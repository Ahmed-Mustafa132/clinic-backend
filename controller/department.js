const {department} = require("../model/index");

const getAllDepartments = async (req, res) => {
  try {
    const departmentsList = await department.findAll();
    res.json(departmentsList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const createDepartment = async (req, res) => {
  try {
    const {} = req.body;
    res.status(201).json(savedDepartment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createDepartment, getAllDepartments };
