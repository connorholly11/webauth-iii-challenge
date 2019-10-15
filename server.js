const express = require("express");
const usersRouter = require("./data/users/users.router");

const server = express();

server.use(express.json());
server.use("/api", usersRouter);

module.exports = server;
