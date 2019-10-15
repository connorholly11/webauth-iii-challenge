const jwt = require("jsonwebtoken");

module.exports = {
  restricted
};

function restricted(req, res, next) {
  if (jwt) {
    next();
  } else {
    res.status(401).json({ message: "you shall not pass!" });
  }
}
