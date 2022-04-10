const express = require("express");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const router = express.Router();

//log user in
router.get("/", (req, res) => {
  const loggedIn = !!req.session.userId;
  const userId = req.session.userId;
  const userName = req.session.userName;
  const firstName = req.session.firstName;
  const lastName = req.session.lastName;
  const email = req.session.email;

  res.json({
    loggedIn: loggedIn,
    userId: userId,
    userName: userName,
    firstName: firstName,
    lastName: lastName,
    email: email,
  });
});

router.post("/", (req, res) => {
  const { userName, password } = req.body;

  User.finduserByUserName(userName).then((user) => {
    if (user) {
      const isValidPassword = bcrypt.compareSync(
        password,
        user.password_digest
      );
      if (isValidPassword) {
        // log the user in
        // console.log(user);
        // console.log(`firstname is:`, user.first_name);
        req.session.userId = user.id;
        req.session.userName = user.user_name;
        req.session.firstName = user.first_name;
        req.session.lastName = user.last_name;
        req.session.email = user.email;

        // console.log(req.session);
        // send back user's name to them
        res.status(200).json({
          userId: user.id,
          userName: user.user_names,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
        });
      } else {
        // send back a message to inform the user that they provided the wrong email or password
        res.status(422).json({ message: "invalid user name or password" });
      }
    } else {
      // send back a message to inform the user that they provided the wrong email or password
      res.status(422).json({ message: "invalid user name or password" });
    }
  });
});

module.exports = router;
