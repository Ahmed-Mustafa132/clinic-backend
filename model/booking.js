const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const booking = sequelize.define("booking", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  doctorid: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: "users",
      key: "id",
    },
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.ENUM("pending", "confirmed", "rejected"),
    allowNull: false,
    defaultValue: "pending",
  },
});

// Define Associations

module.exports = booking;
