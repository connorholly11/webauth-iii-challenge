const db = require("../db.config");

module.exports = {
  find,
  findBy,
  addUser
};

function find() {
  return db("users");
}

function findBy(username) {
  return db("users").where(username);
}

function addUser(newUser) {
  return db("users").insert(newUser);
}
