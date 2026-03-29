const User = require("../model/user");
const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log(token);
    console.log(process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res.status(401).json({ message: "try to create account" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
// is admin
const isAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== "admin") {
      return res.status(403).json({ message: "access denied" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  auth,
  isAdmin,
};
