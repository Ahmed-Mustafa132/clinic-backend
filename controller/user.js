const { where } = require("sequelize");
const { user, department } = require("../model/index");
const { calcAge } = require("../service/calcAge");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, birthday, email, password, phone, address, gender } =
      req.body;
    if (
      !name ||
      !birthday ||
      !email ||
      !password ||
      !phone ||
      !address ||
      !gender
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const validEmail = await user.findOne({ where: { email } });
    if (validEmail) {
      return res
        .status(400)
        .json({ message: "This email is already registered" });
    }
    const hashpassword = await bcryptjs.hash(password, 10);
    const finaluser = {
      name: name,
      birthday: birthday,
      email: email,
      password: hashpassword,
      phone: phone,
      address: address,
      gender: gender,
      medical_history: req.body.medical_history || "None",
    };
    const user = await user.create(finaluser);
    console.log(user);
    res.status(201).json({ message: "user registered successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await user.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    const userdata = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    console.log(userdata);
    res.status(200).json({
      message: "Login successful",
      token,
      user: userdata,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
const getAllusers = async (req, res) => {
  try {
    const users = await user.findAll({
      attributes: ["id", "name", "email", "role"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
// update user
const updateuser = async (req, res) => {
  try {
    const { name, birthday, password } = req.body;
    const { id } = req.user;
    if (!name || !birthday || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await user.update(req.body, {
      where: { id },
    });
    res.json({
      message: "user updated successfully",
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
// delete user
const deleteuser = async (req, res) => {
  try {
    const { id } = req.user;
    await user.destroy({
      where: { id },
    });
    res.json({ message: "user deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      birthday,
      email,
      password,
      phone,
      address,
      gender,
      departmentId,
    } = req.body;

    if (!name || !email || !password || !departmentId) {
      return res
        .status(400)
        .json({ message: "Name, Email, Password and Department are required" });
    }

    const existinguser = await user.findOne({ where: { email } });
    if (existinguser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashpassword = await bcryptjs.hash(password, 10);

    const doctor = await user.create({
      name,
      birthday,
      email,
      password: hashpassword,
      phone,
      address,
      gender,
      role: "doctor",
      departmentId,
      medical_history: "N/A",
    });

    res.status(201).json({ message: "Doctor added successfully", doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
// get doctor  from  Appointment
const getDoctors = async (req, res) => {
  try {
    const doctors = await user.findAll({
      where: { role: "doctor" },
      attributes: ["id", "name"],
      include: [
        {
          model: department,
          as: "department",
          attributes: ["name"],
        },
      ],
    });
    res.status(201).json({ message: "Doctor get successfully", data: doctors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllusers,
  register,
  login,
  updateuser,
  deleteuser,
  addDoctor,
  getDoctors,
};
