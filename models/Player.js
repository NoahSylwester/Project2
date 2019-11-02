const { Model, DataTypes } = require("sequelize");

class Player extends Model {
  static init(sequelize) {
    return super.init(
      {
        alias: {
          type: DataTypes.STRING,
          unique: true,
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

  static associate(models) {
    Player.hasMany(models.PhysicalCard);
    Player.hasMany(models.Deck);
  }

  static parse(data) {
    if (Array.isArray(data)) {
      return data.map(data => Player.parse(data));
    }

    return {
      alias: data.alias
    };
  }
}

module.exports = Player;
