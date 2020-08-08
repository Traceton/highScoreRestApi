require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const server = express();
const database = mongoose.connection;
const gameSessionsRouter = require("./routes/gameSessions.js");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

database.on("error", (error) => {
  console.log("error");
});

database.once("open", () => {
  console.log("Connected to database");
});

server.use(express.json());

server.get("/", (req, res) => {
  res.send("High Score REST api running now. ");
});

server.use("/gameSessions", gameSessionsRouter);

server.listen(process.env.PORT, () => {
  console.log(`server started at localhost:${process.env.PORT}`);
});
