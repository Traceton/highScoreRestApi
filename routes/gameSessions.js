const express = require("express");
const router = express();
module.exports = router;
const GameSession = require("../models/gameSession.js");

let findGameSession = async (req, res, next) => {
  let gameSession;
  try {
    gameSession = await GameSession.findById(req.params.id);
    if (gameSession == null) {
      return res.status(404).json({ message: "cannot find game session" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.gameSession = gameSession;
  next();
};

// get info about the REST Api
router.use("/about", (req, res) => {
  res.send(`<h1><a>tjcharm.github.io</a></h1>
        <h2>A node.js REST Api hosted on heroku, created by Traceton Timmerman for my js games.</h2>
        <h2>use -> <a>https://gamescoreserver.herokuapp.com/gameSessions</a></h2>`);
});

// get all game sessions.
router.get("/", async (req, res) => {
  try {
    const gameSessions = await GameSession.find();
    res.status(200).json(gameSessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get one game session
router.get("/:id", findGameSession, async (req, res) => {
  try {
    res.status(200).json(res.gameSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create one game session
router.post("/", async (req, res) => {
  const gameSession = new GameSession({
    username: req.body.username,
    game: req.body.game,
    score: req.body.score,
  });
  try {
    const newGameSession = await gameSession.save();
    res.status(200).json(newGameSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete one game session
router.delete("/:id", findGameSession, async (req, res) => {
  try {
    await res.gameSession.remove();
    res.status(200).json("game session was deleted.");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
