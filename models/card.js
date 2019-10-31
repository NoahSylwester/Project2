var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");

var Card = sequelize.define("card", {
  card_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  card_name: {
    type: Sequelize.STRING
  },
  card_type: {
    type: Sequelize.STRING
  },
  image_url: {
    type: Sequelize.STRING
  },
  card_cost: {
    type: Sequelize.STRING
  },
  card_rules: {
    type: Sequelize.STRING
  },
  card_attack: {
    type: Sequelize.INTEGER
  },
  card_defense: {
    type: Sequelize.INTEGER
  }
});