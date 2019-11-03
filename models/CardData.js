const { Model, DataTypes } = require("sequelize");

const CardDataType = ["cost", "attack", "defense", "ability", "racial"];

class CardData extends Model {
  static init(sequelize) {
    return super.init(
      {
        type: {
          type: DataTypes.ENUM,
          values: CardDataType,
          allowNull: false
        },
        data: {
          type: DataTypes.JSON,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        }
      },
      {
        sequelize,
        modelName: "cardData",
        underscored: true
      }
    );
  }

  static associate(models) {
    CardData.belongsTo(models.Card);
  }
}

module.exports = CardData;
