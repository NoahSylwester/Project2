const { Router } = require("express");

let router = Router();

const { models } = require("../models");

function getInclude(dataType) {
  if (dataType === "full" || typeof dataType === "undefined") {
    return [
      {
        model: models.DeckCard,
        include: [
          {
            model: models.Card,
            include: [models.CardData]
          }
        ]
      }
    ];
  } else if (dataType === "partial") {
    return [models.DeckCard];
  }
}

router.get("/", (req, res) => {
  let { data } = req.query;

  let include = getInclude(data);
  if (!include) {
    return res.json({ urMom: "fat" });
  }

  models.Deck.findAll({ include })
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
  let { data } = req.query;
  let { id } = req.params;

  let include = getInclude(data);
  if (!include) {
    return res.json({ urMom: "fat" });
  }
  models.Deck.findByPk(id, { include })
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
  let { name, deckCards } = req.body;

  models.Deck.findByPk(id).then(deck => {
    if (!deck) {
      return res.status(400).end();
    }
    let promises = [];
    if (typeof name !== "undefined") {
      promises.push(
        new Promise((resolve, reject) => {
          deck
            .update({
              name
            })
            .then(result => {
              resolve(result.get({ plain: true }));
            })
            .catch(err => {
              reject(err);
            });
        })
      );
    }
    if (deckCards) {
      function testDeckCards(deckCards) {
        let badData = false;
        deckCards.forEach(deckCard => {
          if (badData) {
            return;
          }

          let { cardId, count } = deckCard;
          if (typeof cardId === "undefined" || typeof count === "undefined") {
            badData = true;
          }
        });
        return badData;
      }
      if (Array.isArray(deckCards)) {
        promises.push(
          new Promise((resolve, reject) => {
            if (testDeckCards(deckCards)) {
              return resolve({
                status: 400,
                statusText: "BAD DATA",
                data: deckCards
              });
            }

            deck
              .setDeckCards([])
              // eslint-disable-next-line no-unused-vars
              .then(_ => {
                return Promise.all(
                  deckCards.map(deckCard => {
                    // eslint-disable-next-line no-unused-vars
                    return new Promise((resolve, reject) => {
                      deck
                        .createDeckCard(deckCard)
                        .then(data => data.get({ plain: true }))
                        .then(card => {
                          resolve({
                            status: 200,
                            statusText: "OK",
                            deckCard: card
                          });
                        })
                        .catch(err => {
                          console.log(err);
                          resolve({
                            status: 422,
                            statusText: "FAILED",
                            deckCard: deckCard
                          });
                        });
                    });
                  })
                );
              })
              .then(results => {
                resolve(results);
              })
              .catch(err => {
                reject(err);
              });
          })
        );
      } else if (deckCards.toAdd || deckCards.toRemove) {
        if (deckCards.toAdd) {
          promises.push(
            new Promise((resolve, reject) => {
              if (testDeckCards(deckCards.toAdd)) {
                return resolve({
                  status: 400,
                  statusText: "BAD DATA",
                  data: deckCards.toAdd
                });
              }

              let promises = deckCards.toAdd.map(
                deckCard =>
                  // eslint-disable-next-line no-unused-vars
                  new Promise((resolve, reject) => {
                    deck
                      .createDeckCard(deckCard)
                      .then(data => data.get({ plain: true }))
                      .then(card => {
                        resolve({
                          status: 200,
                          statusText: "OK",
                          deckCard: card
                        });
                      })
                      .catch(err => {
                        console.log(err);
                        resolve({
                          status: 422,
                          statusText: "FAILED",
                          deckCard: deckCard
                        });
                      });
                  })
              );

              Promise.all(promises)
                .then(results => {
                  resolve(results);
                })
                .catch(err => {
                  reject(err);
                });
            })
          );
        }
        if (deckCards.toRemove) {
          promises.push(
            // eslint-disable-next-line no-unused-vars
            new Promise((resolve, reject) => {
              resolve({
                status: 404,
                statusText: "cannot remove yet"
              });
            })
          );
        }
      }
    }
    if (promises.length > 0) {
      Promise.all(promises).then(results => {
        res.json(results);
      });
    } else {
      res.status(400).end();
    }
  });
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
