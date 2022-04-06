const pg = require("pg");

const db = new pg.Pool({
  database: "asteroids",
});

module.exports = db;
