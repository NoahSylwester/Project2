const { Router } = require("express");

let router = Router();

const { models } = require("../models");

const include = [models.Card, models.Player];

router.get("/", (req, res) => {
  models.PhysicalCard.findAll({ include }).then(cards => {
    res.json(cards);
  });
});

router.get("/:hash", (req, res) => {
  let { hash } = req.params;
  models.PhysicalCard.findOne({
    where: { hash },
    include
  }).then(card => {
    res.json(card);
  });
});

router.post("/", (req, res) => {
  let { body } = req;
  let { hash, cardId, playerId } = body;

  if (!hash || !cardId || !playerId) {
    res.status(400).end();
    return;
  }

  models.PhysicalCard.create({
    hash,
    cardId,
    playerId
  })
    .then(newCard => {
      res.json(newCard);
    })
    .catch(err => {
      console.error(err);
      res.status(422).end();
    });
});

module.exports = router;
