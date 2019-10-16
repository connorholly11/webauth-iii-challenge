const express = require("express");
const usersRouter = require("./data/users/users.router");
const cors = require("cors");

const server = express();

server.use(cors());
server.use(express.json());
server.use("/api", usersRouter);

server.get("/testing", (req, res) => {
  res.send("testing working!");
});

module.exports = server;
