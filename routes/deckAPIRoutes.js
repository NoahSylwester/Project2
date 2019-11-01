const { Router } = require("express");

let router = Router();

const { models } = require("../models");

router.get("/", (req, res) => {
  models.Deck.findAll({
    include: [
      {
        model: models.DeckCard,
        include: [
          {
            model: models.Card,
            include: [models.CardData]
          }
        ]
      }
    ]
  })
    .then(data => data.map(data => data.get({ plain: true })))
    .then(decks => {
      res.json(models.Deck.parse(decks, models));
    })
    .catch(err => {
      console.error(err);
      res.status(400).end();
    });
});

router.get("/:id", (req, res) => {
  let { id } = req.params;
  models.Deck.findByPk(id, {
    include: [
      models.Player,
      {
        model: models.DeckCard,
        include: [{ model: models.Card, include: [models.CardData] }]
      }
    ]
  })
    .then(data => data.get({ plain: true }))
    .then(deck => {
      res.json(models.Deck.parse(deck, models));
    })
    .catch(err => {
      console.error(err);
      res.status(400).end();
    });
});

router.put("/:id", (req, res) => {
  let { id } = req.params;
  let { name, cardToAdd, cardsToRemove } = req.body;

  console.log(id, name, cardToAdd, cardsToRemove);
  res.status(404).end();
});

router.delete("/:id", (req, res) => {
  let { id } = req.params;
  models.Deck.destroy({ where: { id } })
    .then(result => {
      if (!result) {
        throw new Error("no result");
      }
      return models.DeckCard.destroy({ where: { deckId: null } });
    })
    .then(data => data.get({ plain: true }))
    .then(result => {
      console.log(result);
      res.status(200).end();
    })
    .catch(err => {
      console.error(err);
      res.status(400).end();
    });
});

module.exports = router;
