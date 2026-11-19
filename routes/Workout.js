const express = require("express");
const router = express.Router();

const workoutController = require("../controllers/WorkoutController.js");

const { verify } = require("../auth.js");

//add workout
router.post("/addWorkout", verify, workoutController.addWorkout);

//get workout
router.get("/getMyWorkouts", verify, workoutController.getUserWorkouts);

module.exports = router;
