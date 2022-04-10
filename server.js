const express = require("express");
const path = require("path");

// access app object
const app = express();
const port = process.env.PORT || 4000;

//middlewares
const logger = require("./middlewares/logger");
const sessions = require("./middlewares/sessions");

//controllers
const asteroidsController = require("./controllers/asteroids_controller");
const reactController = require("./controllers/reactController");
const usersController = require("./controllers/users_controller");
const sessionsController = require("./controllers/sessions_controller");

app.listen(port, () => console.log(`listening on port ${port}`));

app.use(logger);
app.use(express.json());
app.use(sessions);

app.use(express.static(path.join(__dirname, "./react_asteroids/build")));
app.use("/users", usersController);
app.use("/sessions", sessionsController);
app.use("/", reactController);

app.use(express.static("client"));
app.use("/asteroids", asteroidsController);
