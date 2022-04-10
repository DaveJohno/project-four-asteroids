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
module.exports = router;
