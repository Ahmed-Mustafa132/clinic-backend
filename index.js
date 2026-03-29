const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/database");
const app = express();
app.use(express.json());
dotenv.config();

app.use(cors());
app.use(morgan("dev"));
const userRouter = require("./router/user");
const departmentRouter = require("./router/department");
const dashboardRouter = require("./router/dashoard");
const bookingRouter = require("./router/booking");
app.use("/user", userRouter);
app.use("/department", departmentRouter);
app.use("/dashboard", dashboardRouter);
app.use("/booking", bookingRouter);

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

db.sync({ alter: true })
  .then(() => console.log("Tables created successfully!"))
  .catch((err) => console.error("Sync error: ", err));

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running on port " + (process.env.PORT || 4000));
});
