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
}

module.exports = PhysicalCard;
