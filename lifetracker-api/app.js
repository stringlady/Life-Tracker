"use strict"

/** Express app for LifeTracker */

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const User = require("./models/user")
const Nutrition = require('./models/nutrition');
const Sleep = require('./models/sleep');
const Exercise = require('./models/exercise');

const { NotFoundError } = require("./utils/errors");
const config = require("./config");
const jwt = require('jsonwebtoken');

const app = express();

// enable cross-origin resource sharing for all origins for all requests
// NOTE: in production, we'll want to restrict this to only the origin
// hosting our frontend.
app.use(cors());

// parse incoming requests with JSON payloads
app.use(express.json());
// log requests info
app.use(morgan("tiny"));

// routes
app.post("/login", async function (req, res, next) {
  try {
    const user = await User.authenticate(req.body)
    // Create and sign a JWT token
    const payload = {
      user: {
        id: user.id
      }
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return res.status(200).json({ user, token })
  } catch (err) {
    next(err)
  }
})

app.post("/register", async function (req, res, next) {
  try {
    const user = await User.register(req.body)
    // Create and sign a JWT token
    const payload = {
      user: {
        id: user.id
      }
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return res.status(201).json({ user, token })
  } catch (err) {
    next(err)
  }
})

app.post("/nutrition", async function (req, res, next) {
  try {
    const nutrition = await Nutrition.add(req.body)
    return res.status(201).json({ nutrition })
  } catch (err) {
    next(err)
  }
})

app.get("/nutrition/:nutritionId", function (req, res) {
  const nutritionId = req.params.nutritionId;
  const nutrition = Nutrition.fetchByNutritionId(nutritionId);
  return res.status(200).json({ nutrition })
})

app.get("/nutrition/user/:userId", function (req, res) {
  const userId = req.params.userId;
  const nutrition = Nutrition.fetchByUserId(userId);
  return res.status(200).json({ nutrition })
})

app.post("/sleep", async function (req, res, next) {
  try {
    const sleep = await Sleep.add(req.body)
    return res.status(201).json({ sleep })
  } catch (err) {
    next(err)
  }
})

app.get("/sleep/:sleepId", function (req, res) {
  const sleepId = req.params.sleepId;
  const sleep = Sleep.fetchBySleepId(sleepId);
  return res.status(200).json({ sleep })
})

app.get("/sleep/user/:userId", function (req, res) {
  const userId = req.params.userId;
  const sleep = Sleep.fetchByUserId(userId);
  return res.status(200).json({ sleep })
})

app.post("/exercise", async function (req, res, next) {
  try {
    const exercise = await Exercise.add(req.body)
    return res.status(201).json({ exercise })
  } catch (err) {
    next(err)
  }
})

app.get("/exercise/:exerciseId", function (req, res) {
  const exerciseId = req.params.exerciseId;
  const exercise = Exercise.fetchByExerciseId(exerciseId);
  return res.status(200).json({ exercise })
})

app.get("/exercise/user/:userId", function (req, res) {
  const userId = req.params.userId;
  const exercise = Exercise.fetchByUserId(userId);
  return res.status(200).json({ exercise })
})

// health check
app.get("/", function (req, res) {
  return res.status(200).json({
    ping: "pong",
  })
})

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError())
})

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (!config.IS_TESTING) console.error(err.stack)
  const status = err.status || 500
  const message = err.message

  return res.status(status).json({
    error: { message, status },
  })
})

module.exports = app