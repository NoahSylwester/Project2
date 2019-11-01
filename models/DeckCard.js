const { Model, DataTypes } = require("sequelize");

class DeckCard extends Model {
  static init(sequelize) {
    return super.init(
      {
        count: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 0
          }
        }
      },
      {
        sequelize,
        modelName: "deckCard",
        underscored: true
      }
    );
  }

  static associate(models) {
    DeckCard.belongsTo(models.Card);
    DeckCard.belongsTo(models.Deck);
  }

  static parse(data, models) {
    if (Array.isArray(data)) {
      return data.map(data => DeckCard.parse(data));
    }

    let deckCard = {
      cardId: data.cardId,
      count: data.count
    };

    if (data.card) {
      deckCard.card = models.Card.parse(data.card);
    }

    return deckCard;
  }
}

module.exports = DeckCard;
