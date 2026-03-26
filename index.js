const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const db = require("./config/database");
const app = express();
app.use(express.json());

app.use(cors());
app.use(morgan("dev"));

const userRouter = require("./router/user");
app.use("/user", userRouter);

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

db.sync({ alter: true }) // السطر ده هو اللي هيحول الـ Model لجدول حقيقي
  .then(() => console.log("Tables created successfully!"))
  .catch((err) => console.error("Sync error: ", err));

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running on port " + (process.env.PORT || 4000));
});
