const db = require("../db/db");

const Astroids = {
  findAll: () => {
    const sql = "SELECT * From high_scores";
    return db.query(sql).then((dbRes) => dbRes.rows);
  },

  findAllTopScores: () => {
    const sql = "SELECT * From high_scores ORDER BY score DESC LIMIT 10";
    return db.query(sql).then((dbRes) => dbRes.rows);
  },

  findUserTopScores: (userID) => {
    const sql =
      "SELECT * From high_scores WHERE user_id = $1 ORDER BY score DESC LIMIT 10";
    return db.query(sql, [userID]).then((dbRes) => dbRes.rows);
  },

  AddScore: (user_id, player_name, round_number, score) => {
    const sql = `INSERT INTO high_scores( user_id , player_name , round_number , score) VALUES ($1,$2,$3,$4)
            RETURNING *
        `;
    return db
      .query(sql, [user_id, player_name, round_number, score])
      .then((dbRes) => dbRes.rows[0]);
  },
};

module.exports = Astroids;
