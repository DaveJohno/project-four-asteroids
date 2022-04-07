const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../react_asteroids/build", "index.html"));
});

module.exports = router;
