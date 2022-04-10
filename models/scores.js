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

  // delect this when i pass userid in when logged in sesion
  findUserTopScores: (userId) => {
    console.log("this is the models UserID", userId);
    const sql =
      "SELECT * From high_scores WHERE user_id = $1 ORDER BY score DESC LIMIT 10";
    return db.query(sql, [userId]).then((dbRes) => dbRes.rows);
  },

  addScore: (user_id, user_name, round_number, score) => {
    const sql = `INSERT INTO high_scores( user_id , user_name , round_number , score) VALUES ($1,$2,$3,$4)
            RETURNING *
        `;
    return db
      .query(sql, [user_id, user_name, round_number, score])
      .then((dbRes) => dbRes.rows[0]);
  },
};

module.exports = Astroids;
