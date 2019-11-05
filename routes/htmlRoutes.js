const path = require("path");
const { Router } = require("express");

let router = Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/splash.html"));
});

router.get("/menu", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/menu.html"));
});

router.get("/deck", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/deck.html"));
});

router.get("/game", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/html/game.html"));
});

module.exports = router;
