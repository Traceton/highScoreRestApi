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

// testing purpose text
app.use("/gameSessions", gameSessionsRouter);

app.listen(process.env.PORT, () => {
  console.log(`server started at localhost:${process.env.PORT}`);
});
