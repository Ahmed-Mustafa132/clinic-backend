const { booking, department, user } = require("../model/index");

const getDashboardStats = async (req, res) => {
  try {
    const totalDoctors = await user.count({
      where: { role: "doctor" },
    });
    const doctors = await user.findAll({
      where: { role: "doctor" },
      attributes: ["id", "name", "email", "phone"],
      include: [
        {
          model: department,
          as: "department",
          attributes: ["name"],
        },
      ],
    });

    const totalPatients = await user.count({
      where: { role: "user" },
    });

    const departmentsList = await department.findAll();
    const totalDepartments = await department.count();
    const totalBookings = await booking.count();
    const recentBookings = await booking.findAll({
      limit: 5,
      order: [["createdAt"]],
      include: [
        { model: user, as: "user", attributes: ["name"] },
        { model: department, as: "department", attributes: ["name"] },
      ],
    });
    console.log("Recent Bookings:", recentBookings);

    res.status(200).json({
      success: true,
      data: {
        totalDoctors,
        totalPatients,
        totalDepartments,
        totalBookings,
      },
      doctors,
      recentBookings,
      department: departmentsList,
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  getDashboardStats,
};
