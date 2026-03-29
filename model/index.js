const user = require("./user");
const department = require("./department");
const booking = require("./booking");

// --- علاقات المستخدم والقسم ---
user.belongsTo(department, { foreignKey: "departmentId", as: "department" });
department.hasMany(user, {
  foreignKey: "departmentId",
  as: "doctors",
});

// --- علاقات الحجز (Booking) ---
// الربط مع المريض
booking.belongsTo(user, { foreignKey: "userid", as: "user" });

// الربط مع القسم (ده اللي كان ناقص ومسبب Error الـ Dashboard)
booking.belongsTo(department, { foreignKey: "doctorid", as: "department" });

module.exports = {
  user,
  department,
  booking,
};
