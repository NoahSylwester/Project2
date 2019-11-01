const { Router } = require("express");

let router = Router();

const { models } = require("../models");

router.get("/:alias", (req, res) => {
  let { alias } = req.params;
  models.Player.findOne({ where: { alias } }).then(player => {
    res.json(player);
  });
});

router.get("/:alias/cards", (req, res) => {
  let { alias } = req.params;
  models.Player.findOne({
    where: { alias },
    include: [
      {
        model: models.PhysicalCard,
        include: [
          {
            model: models.Card,
            include: [models.CardData]
          }
        ]
      }
    ]
  })
    .then(player => {
      return player.physicalCards;
    })
    .then(physicalCards => {
      res.json(models.PhysicalCard.parse(physicalCards, models));
    })
    .then(physicalCards => {
      res.json(physicalCards);
    });
});

router.get("/:alias/decks", (req, res) => {
  let { alias } = req.params;
  models.Player.findOne({
    where: { alias },
    include: [
      {
        model: models.Deck,
        include: {
          model: models.DeckCard,
          include: {
            model: models.Card,
            include: [models.CardData]
          }
        }
      }
    ]
  })
    .then(player => player.decks)
    .then(decks => {
      res.json(models.Deck.parse(decks, models));
    });
});

router.post("/:alias/decks", (req, res) => {
  let { alias } = req.params;
  let { body } = req;
  let { name, deckCards } = body;

  if (!name || !Array.isArray(deckCards)) {
    res.status(400).end();
    return;
  }

  models.Player.findOne({ where: { alias } }).then(player => {
    return models.Deck.create(
      {
        name,
        playerId: player.id,
        deckCards
      },
      {
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
      }
    )
      .then(creationResult => creationResult.dataValues)
      .then(deck => {
        res.json(models.Deck.parse(deck, models));
      })
      .catch(err => {
        console.error(err);
        res.status(422).end();
      });
  });
});

module.exports = router;
