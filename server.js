require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
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

app.use(express.json());

app.use("/about", (req, res) => {
  res.send(`<h1><a>tjcharm.github.io</a></h1>
          <h2>A node.js REST Api hosted on heroku, created by Traceton Timmerman for my js games.</h2>
          <h2>use -> <a>https://gamescoreserver.herokuapp.com/gameSessions</a></h2>`);
});

app.use("/gameSessions", gameSessionsRouter);

app.listen(process.env.PORT, () => {
  console.log(`server started at localhost:${process.env.PORT}`);
});
