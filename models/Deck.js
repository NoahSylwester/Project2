const { Model, DataTypes } = require("sequelize");

class Deck extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        }
      },
      {
        sequelize,
        modelName: "deck",
        underscored: true
      }
    );
  }

  static associate(models) {
    Deck.belongsTo(models.Player);

    Deck.hasMany(models.DeckCard);
  }
}

module.exports = Deck;
