const express = require("express");
const mongoose = require("mongoose");

//server
const app = express();
// port
const port = 4000;

//connect to db
mongoose.connect(
  "mongodb+srv://admin:admin1234@b645-bulaong.rkrbcvy.mongodb.net/FitnessTracker?appName=B645-Bulaong",
);

//check possible events / monitor db connection
let db = mongoose.connection;
db.on("error", () => console.error("Connection Error!"));
db.once("open", () => console.log("We're connected to the MongoDB!"));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes Middleware
const workoutRoutes = require("./routes/Workout");
const userRoutes = require("./routes/User");

app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

if (require.main === module) {
  app.listen(process.env.PORT || 4000, () => {
    console.log(`API is now online on port ${process.env.PORT || 4000}`);
  });
}

module.exports = { app, mongoose };
