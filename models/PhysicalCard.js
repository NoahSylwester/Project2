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

    let card = models.Card.parse(data.card);

    Object.keys(card).forEach(key => {
      if (key === "id") {
        return;
      } else {
        qrlCard[key] = card[key];
      }
    });

    if (data.player) {
      qrlCard.player = data.player;
    }

    return qrlCard;
  }
}

module.exports = PhysicalCard;
