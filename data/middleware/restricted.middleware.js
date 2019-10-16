const jwt = require("jsonwebtoken");
const secrets = require("../../config/secrets");

module.exports = {
  restricted
};

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "invalid" });
      } else {
        req.user = {
          username: decodedToken.username, //username is referring to user.username in the payload
          password: decodedToken.password
        }; //these are coming from the payload in the users router

        next();
      }
    });
  } else {
    res.status(401).json({ message: "you shall not pass!" });
  }
}
