const express = require("express");
const Astroids = require("../models/scores");
const path = require("path");
const app = express();
const router = express.Router();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

router.get("/scores", (req, res) => {
  Astroids.findAllTopScores().then((scores) => res.json(scores));
});

router.get("/userScores", (req, res) => {
  userId = req.session.userId;
  console.log("this is the id: ", userId);
  Astroids.findUserTopScores(userId).then((scores) => res.json(scores));
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "index.html"));
});

router.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../client", "about.html"));
});

router.post("/scores", (req, res) => {
  console.log(req.body, res.body);

  console.log(req.body);
  user_id = req.body.userId;
  user_name = req.body.userName;
  round_number = req.body.round;
  score = req.body.score;

  Astroids.addScore(user_id, user_name, round_number, score).then((scores) =>
    res.json(scores)
  );
});

module.exports = router;
