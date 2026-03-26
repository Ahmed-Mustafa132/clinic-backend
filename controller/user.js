const User = require("../module/user");
const { calcAge } = require("../service/calcAge");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  console.log(req.body);
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
    const validEmail = await User.findOne({ where: { email } });
    if (validEmail) {
      console.log("this email arady  regsterd");
      res.status(400).json({ message: "this email arady  regsterd" });
    }
    const hashpassword = await bcryptjs.hash(password, 10);
    const finalUser = {
      name: name,
      birthday: birthday,
      email: email,
      password: hashpassword,
      phone: phone,
      address: address,
      gender: gender,
      medical_history: req.body.medical_history || "None",
    };
    const user = await User.create(finalUser);
    console.log(user);
    res.status(201).json({ message: "User registered successfully", user });
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

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "1d" },
    );

    const userdata = {
      id: user.id,
      name: user.name,
      email: user.email,
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
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll("", {
      attributes: ["id", "name", "age", "email"],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
// updata  user
const updataUser = async (req, res) => {
  try {
    const { name, age, password } = req.body;
    const { id } = req.user;
    if (!name || !age || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.update(req.body, {
      where: { id },
    });
    res.json({
      message: "User updated successfully",
      user: { name: user.name, age: user.age, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
// delet  User
const deletUser = async (req, res) => {
  try {
    const { id } = req.user;
    await User.destroy({
      where: { id },
    });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  register,
  login,
  updataUser,
  deletUser,
};
