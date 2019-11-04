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

  static parse(data, models) {
    if (Array.isArray(data)) {
      return data.map(data => Deck.parse(data, models));
    }

    let deck = {
      id: data.id,
      name: data.name,
      playerId: data.playerId
    };

    if (data.deckCards) {
      deck.deckCards = models.DeckCard.parse(data.deckCards, models);
    }

    return deck;
  }
}

module.exports = Deck;
