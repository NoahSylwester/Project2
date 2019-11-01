"use strict";

const path = require("path");

const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";

const config = require(path.join(__dirname, "/../config/config.js"))[env];

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const models = {
  Card: require("./Card.js"),
  CardData: require("./CardData.js"),
  Player: require("./Player.js"),
  Deck: require("./Deck.js"),
  DeckCard: require("./DeckCard.js"),
  PhysicalCard: require("./PhysicalCard.js")
};

Object.values(models).forEach((model) => {
  model.init(sequelize);
});

Object.values(models).forEach((model) => {
  if (model.associate)
    model.associate(models);
});


module.exports = {
  sequelize,
  Sequelize,
  models
};
