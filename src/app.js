const express = require("express");
const { createServer } = require("node:http");

const cors = require("cors");
const { join } = require("path");

const socket = require("./socket");

const app = express();
app.use(cors());
app.use(express.static(join(__dirname, "../public")));

const server = createServer(app);

socket(server);

server.listen(process.env.PORT || 3001, () => {
  console.log("Application is running ");
});
