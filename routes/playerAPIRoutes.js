const { Router } = require("express");

let router = Router();

const { models } = require("../models");

router.get("/", (req, res) => {
  models.Player.findAll()
    .then(data => data.map(data => data.get({ plain: true })))
    .then(player => {
      res.json(player);
    })
    .catch(err => {
      console.error(err);
      res.status(400).end();
    });
});

router.post("/", (req, res) => {
  let { name } = req.body;
  models.Player.create({ name })
    .then(data => data)
    .get({ plain: true })
    .then(player => res.json(models.Player.parse(player)))
    .catch(err => {
      console.error(err);
      res.status(422).end();
    });
});

router.get("/:alias", (req, res) => {
  let { alias } = req.params;
  models.Player.findOne({ where: { alias } })
    .then(data => data.get({ plain: true }))
    .then(player => {
      res.json(player);
    })
    .catch(err => {
      console.error(err);
      res.status(400).end();
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
    .then(data => data.get({ plain: true }))
    .then(player => player.physicalCards)
    .then(realCards => {
      let cards = {};
      realCards.forEach(realCard => {
        if (!cards[realCard.cardId]) {
          cards[realCard.cardId] = {
            cardId: realCard.cardId,
            count: 1,
            card: models.Card.parse(realCard.card),
            hashes: [realCard.hash]
          };
        } else {
          cards[realCard.cardId].count++;
          cards[realCard.cardId].hashes.push(realCard.hash);
        }
      });
      res.json(Object.values(cards));
    })
    .catch(err => {
      console.error(err);
      res.status(400).end();
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
    .then(data => data.get({ plain: true }))
    .then(player => player.decks)
    .then(decks => {
      res.json(models.Deck.parse(decks, models));
    })
    .catch(err => {
      console.error(err);
      res.status(400).end();
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
      .then(data => data.get({ plain: true }))
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
