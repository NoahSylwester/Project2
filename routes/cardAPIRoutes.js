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
  let { body } = req;

  if (Array.isArray(body)) {
    Promise.all(body.map(data => models.Card.post(data, models))).then(
      cards => {
        res.json(cards);
      }
    );
  } else {
    models.Card.post(body, models).then(card => {
      res.json(card);
    });
  }
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
