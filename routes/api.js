const router = require("express").Router();
const Workout = require("../models/Workout");
const { route } = require("./htmlRoutes");

router.post("/api/workouts", (req,res) => {
    Workout.create({})
    .then((workout) => {
        res.json(workout)
    })
    .catch((err) => {
        res.json(err)
    })
});

router.get("/api/workouts", (req,res) => {
    Workout.aggregate([
        {
            $addFields:{
                totalDuration: {
                    $sum: '$exercise.duration'
                }
            }
        }
    ])
    .then((workout) => {
        console.log('Nice!', workout);
        res.json(workout)
    })
    .catch((err) => {
        res.json(err)
    })
});

router.put("/api/workouts/:id", (req, res) => {
    console.log('PARAMS', req.params)
    Workout.findByIdAndUpdate(
        req.params.id,
        { $push: { exercise: req.body } },
        { new: true, runValidators: true }
    )
        .then((workout) => {
            res.json(workout)
        })
        .catch((e) => {
            res.json(e)
        })
});
router.get(`/api/workouts/range`, (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration:
                    { $sum: '$exercise.duration' },
                totalWeight:
                    { $sum: '$exercises.weight' }
            }
        }
    ])
        .limit(10)
        .then((workout) => {
            console.log('Nice!', workout);
            res.json(workout)
        })
        .catch((e) => {
            res.json(e)
        })
});

module.exports = router;