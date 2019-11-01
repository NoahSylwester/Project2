const { Router } = require("express");

let router = Router();

const { models } = require("../models");

router.get("/", (req, res) => {
  models.Card.findAll({ include: [models.CardData] })
    .then(data => data.map(data => data.get({ plain: true })))
    .then(cards => {
      res.json(models.Card.parse(cards));
    });
});

router.post("/", (req, res) => {
  let { title, description, type, imagePath, cardData } = req.body;

  if (
    !title ||
    !description ||
    !type ||
    !imagePath ||
    !cardData ||
    !Array.isArray(cardData)
  ) {
    res.status(400).end();
    return;
  }

  models.Card.create(
    {
      title,
      description,
      type,
      imagePath,
      cardData
    },
    { include: [models.CardData] }
  )
    .then(data => data.get({ plain: true }))
    .then(newCard => {
      res.json(models.Card.parse(newCard));
    })
    .catch(err => {
      console.error(err);
      res.status(422).end();
    });
});

router.get("/:id", (req, res) => {
  let { id } = req.params;
  models.Card.findByPk(id, { include: [models.CardData] })
    .then(data => data.get({ plain: true }))
    .then(card => {
      res.json(models.Card.parse(card));
    })
    .catch(err => {
      console.error(err);
      res.status(400).end();
    });
});

module.exports = router;
