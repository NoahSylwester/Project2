const { Model, DataTypes } = require("sequelize");

class PhysicalCard extends Model {
  static init(sequelize) {
    return super.init(
      {
        hash: {
          type: DataTypes.TEXT,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        }
      },
      {
        sequelize,
        modelName: "physicalCard",
        underscored: true
      }
    );
  }

  static associate(models) {
    PhysicalCard.belongsTo(models.Card);
    PhysicalCard.belongsTo(models.Player);
  }

  static parse(data, models) {
    if (Array.isArray(data)) {
      return data.map(data => PhysicalCard.parse(data, models));
    }
    let qrlCard = {
      hash: data.hash,
      cardId: data.cardId
    };

    if (data.card) {
      qrlCard.card = models.Card.parse(data.card);
    }

    if (data.player) {
      qrlCard.player = models.Player.parse(data.player);
    }

    return qrlCard;
  }
}

module.exports = PhysicalCard;
