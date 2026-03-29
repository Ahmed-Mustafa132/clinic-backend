const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // تأكد من مسار ملف الاتصال

const user = sequelize.define(
  "user",
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Must be a valid email address",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 100],
          msg: "Password must be at least 6 characters long",
        },
        isComplex(value) {
          if (
            !/[a-z]/.test(value) ||
            !/[A-Z]/.test(value) ||
            !/[0-9]/.test(value)
          ) {
            throw new Error(
              "Password must contain at least one lowercase letter, one uppercase letter, and one number.",
            );
          }
        },
      },
    },
    role: {
      type: DataTypes.ENUM("admin", "user", "doctor"),
      defaultValue: "user",
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^\d{11}$/,
          msg: "Phone number must be 11 digits",
        },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["male", "female"]],
          msg: "Gender must be 'male' or 'female'",
        },
      },
    },
    medical_history: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "departments",
        key: "id",
      },
    },
  },
  {
    tableName: "users",
    timestamps: true,
  },
);

module.exports = user;
