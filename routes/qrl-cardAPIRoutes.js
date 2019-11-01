const { Router } = require("express");

let router = Router();

const { models } = require("../models");

const include = [
  models.Player,
  { model: models.Card, include: [models.CardData] }
];

router.get("/", (req, res) => {
  models.PhysicalCard.findAll({ include })
    .then(data => data.map(data => data.get({ plain: true })))
    .then(cards => {
      res.json(models.PhysicalCard.parse(cards, models));
    })
    .catch(err => {
      console.error(err);
      res.status(400).end();
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
    .then(data => data.get({ plain: true }))
    .then(newCard => {
      res.json(newCard);
    })
    .catch(err => {
      console.error(err);
      res.status(422).end();
    });
});

router.get("/:hash", (req, res) => {
  let { hash } = req.params;
  models.PhysicalCard.findOne({
    where: { hash },
    include
  })
    .then(data => data.get({ plain: true }))
    .then(card => {
      res.json(card);
    })
    .catch(err => {
      console.error(err);
      res.status(400).end();
    });
});

module.exports = router;
