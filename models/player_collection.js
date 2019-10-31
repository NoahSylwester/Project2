var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");

var Card = sequelize.define("player_collection", {
  instance_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  }
});