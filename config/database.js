const sequelize = require("sequelize");
const db = new sequelize("clinic_db", "root", "252003", {
  host: "127.0.0.1",
  port: 3306,
  dialect: "mysql",
});
module.exports = db;
