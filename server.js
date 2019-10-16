const express = require("express");
const usersRouter = require("./data/users/users.router");
const cors = require("cors");

const server = express();

server.use(cors());
server.use(express.json());
server.use("/api", usersRouter);

module.exports = server;
