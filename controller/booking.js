const { booking } = require("../model/index");

const createBooking = async (req, res) => {
  try {
    console.log("Authenticated User:", req.user);
    console.log("Create Booking Request Body:", req.body);
    const { doctorid, date, time, reason, notes } = req.body;
    if (!doctorid || !date || !time || !reason) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const { id } = req.user;
    const book = {
      userid: id,
      doctorid: doctorid,
      date: date,
      time: time,
      reason: reason,
      notes: notes,
    };
    const newBooking = await booking.create(book);
    res
      .status(201)
      .json({ message: "Booking created successfully", newBooking });
  } catch (error) {
    console.error("Create Booking Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
module.exports = {
  createBooking,
};
