const { Router } = require("express");

let router = Router();

const { models } = require("../models");

router.get("/:alias", (req, res) => {
  let { alias } = req.params;
  models.Player.findOne({ where: { alias } }).then(player => {
    res.json(player);
  });
});

module.exports = router;
