const db = require("../db/db"); //make sure that the path is correct

const sessions = session({
  store: new pgSession({
    pool: db, // Connects to our postgres db
    createTableIfMissing: true, // Creates a session table in your database (go look at it!)
  }),
  secret: process.env.EXPRESS_SESSION_SECRET_KEY,
  cookie: { maxAge: oneDay },
  resave: false, //gets rid of deprecated messages
  saveUninitialized: false, //gets rid of deprecated pmessages
});
