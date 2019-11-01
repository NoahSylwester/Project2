const { Router } = require("express");

let router = Router();

const { models } = require("../models");

const include = [models.CardData];

router.get("/", (req, res) => {
  models.Card.findAll({ include }).then(cards => {
    res.json(models.Card.parse(cards));
  });
});

router.post("/", (req, res) => {
  let { body } = req;
  let { title, description, type, imagePath, cardData } = body;

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
    { include }
  )
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
  models.Card.findByPk(id, {
    include: [models.CardData]
  })
    .then(card => {
      res.json(models.Card.parse(card));
    })
    .catch(err => {
      console.error(err);
      res.status(400).end();
    });
});

module.exports = router;
