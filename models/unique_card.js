var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");

var UniqueCard = sequelize.define("unique_card", {
  instance_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  card_id: {
    type: Sequelize.INTEGER
  },
  card_type: {
    type: Sequelize.STRING
  },
  card_qr: {
    type: Sequelize.STRING
  }
});