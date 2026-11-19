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

//update workout
module.exports.updateUserworkout = (req, res) => {
  const updatedWorkout = {
    name: req.body.name,
    duration: req.body.duration,
  };

  return Workout.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    updatedWorkout,
    { returnDocument: "after" },
  )
    .then((workout) => {
      if (!workout) {
        return res.status(404).send({ error: "Workout not found" });
      }
      return res.status(200).send({
        message: "Workout updated successfully",
        updatedWorkout: workout,
      });
    })
    .catch((error) => errorHandler(error, req, res));
};

//delete workout
module.exports.deleteUserWorkout = (req, res) => {
  return Workout.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
    .then((workout) => {
      if (!workout) {
        return res.status(400).send({ error: "Workout does not exist" });
      }

      return res.status(200).send({
        message: "Workout deleted successfully",
      });
    })
    .catch((error) => errorHandler(error, req, res));
};

//complete workout
module.exports.completeWorkout = (req, res) => {
  return Workout.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { status: "completed" },
    {
      returnDocument: "after",
    },
  )
    .then((workout) => {
      if (workout) {
        res.status(200).send({
          message: "Workout status updated succesfully",
          updatedWorkout: workout,
        });
      } else {
        res.status(400).send({ error: "Workout does not exist" });
      }
    })
    .catch((error) => errorHandler(error, req, res));
};
