const express = require("express");

// access app object
const app = express();
const port = 4000;

//middlewares
const logger = require("./middlewares/logger");
const sessions = require("./middlewares/sessions");

//controllers
const asteroidsController = require("./controllers/asteroids_controller");

app.listen(port, () => console.log(`listening on port ${port}`));

app.use(express.static("client"));
app.use(logger);
app.use(express.json());
app.use(sessions);

app.use("/asteroids", asteroidsController);
