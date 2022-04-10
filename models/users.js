const db = require("../db/db");

const User = {
  finduserByUserName: (userName) => {
    const sql = `
      SELECT * FROM users
      WHERE user_name = $1
    `;

    return db.query(sql, [userName]).then((dbRes) => dbRes.rows[0]);
  },

  finduserByUserId: (userId) => {
    const sql = `
      SELECT * FROM users
      WHERE id = $1
    `;

    return db.query(sql, [userName]).then((dbRes) => dbRes.rows[0]);
  },

  create: (userName, firstName, lastName, email, passwordDigest) => {
    // console.log(userName, firstName, lastName, email, passwordDigest);
    const sql = `
      INSERT INTO users(user_name, first_name, last_name, email, password_digest)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
    `;

    return db
      .query(sql, [userName, firstName, lastName, email, passwordDigest])
      .then((dbRes) => dbRes.rows[0].name);
  },
};

module.exports = User;
