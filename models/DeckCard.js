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
}

module.exports = DeckCard;
