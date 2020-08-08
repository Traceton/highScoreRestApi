const mongoose = require("mongoose");

const gameSessionSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    default: "User",
  },
  game: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
    default: 0,
  },
  datePlayed: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("gameSession", gameSessionSchema);
