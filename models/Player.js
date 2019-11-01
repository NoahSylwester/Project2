const { Model, DataTypes } = require("sequelize");

class Player extends Model {
  static init(sequelize) {
    return super.init(
      {
        alias: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        }
      },
      {
        sequelize,
        modelName: "player",
        underscored: true
      }
    );
  }
}

module.exports = Player;
