const express = require("express");
const db = require("./users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", (req, res) => {
  const user = req.body;

  const hash = bcrypt.hashSync(user.password, 8);

  user.password = hash;

  if (user.username && user.password && user.department) {
    db.addUser(user)
      .then(newUser => {
        res.status(200).json(newUser);
      })
      .catch(error => {
        res.status(500).json({
          error: error,
          message: "500 error on registering new user"
        });
      });
  } else {
    res.status(401).json({ message: "Please provide all required areas" });
  }
});

// router.post("/login", (req, res) => {
//   const credentials = req.body;

//   db.findBy(credentials.username).then(user => {
//     if (user && bcrypt.compareSync(password, user.password)) {
//       const token = generateToken(user);
//       res.status(200).json({
//         user: user,
//         token,
//         message: "you are logged in!"
//       });
//     } else {
//       res.status(401).json({ message: "invalid credentials" });
//     }
//   });
// });

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.findBy({ username })
    .first()
    .then(user => {
      console.log("im here");
      if (user && bcrypt.compareSync(password, user.password)) {
        console.log("im here");

        const token = generateToken(user);
        console.log("im here");

        res.status(200).json({
          token,
          message: "you are logged in!"
        });
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    });
});

router.get("/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json({
        users: users,
        message: "Here are all the users!"
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: "500 error getting users"
      });
    });
});

//generate token function

function generateToken(user) {
  payload = {
    subject: user.id,
    username: user.username,
    password: user.password
  };
  secret = "fajslkfj%@#!^k;lafsj;iojf";

  options = {
    expiresIn: "8h" //check out documentation to figure out more here
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
