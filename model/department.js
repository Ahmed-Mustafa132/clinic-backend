const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // تأكد من مسار ملف الاتصال

const Department = sequelize.define(
  "departments",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "departments",
    timestamps: true,
  },
);

module.exports = Department;
