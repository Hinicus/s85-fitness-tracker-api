const express = require("express");
const router = express.Router();

const workoutController = require("../controllers/WorkoutController.js");

const { verify } = require("../auth.js");

//add workout
router.post("/addWorkout", verify, workoutController.addWorkout);

//get workout
router.get("/getMyWorkouts", verify, workoutController.getUserWorkouts);

//update workout
router.patch("/updateWorkout/:id", verify, workoutController.updateUserworkout);

//delete workout
router.delete(
  "/deleteWorkout/:id",
  verify,
  workoutController.deleteUserWorkout,
);

//update status workout
router.patch(
  "/completeWorkoutStatus/:id",
  verify,
  workoutController.completeWorkout,
);
module.exports = router;
