const { errorHandler } = require("../auth");
const Workout = require("../models/Workout");

module.exports.addWorkout = (req, res) => {
  let userId = req.user.id;
  let name = req.body.name;
  let duration = req.body.duration;
  //validation
  if (!userId && !workoutName && !duration) {
    return res.status(400).send(false);
  }

  let newWorkout = new Workout({
    userId,
    name,
    duration,
  });

  return newWorkout
    .save()
    .then((workout) => {
      return res.status(201).send(workout);
    })
    .catch((error) => errorHandler(error, req, res));
};

//get user's workout
module.exports.getUserWorkouts = (req, res) => {
  return Workout.find({ userId: req.user.id })
    .then((result) => {
      //if user's workout is empty
      if (!result) {
        res.status(404).send(false);
      }

      //success
      res.status(200).send({
        workouts: result,
      });
    })
    .catch((error) => errorHandler(error, req, res));
};
