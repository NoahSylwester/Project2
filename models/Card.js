const { Model, DataTypes } = require("sequelize");

const CardTypes = ["monster", "spell", "secret"];

const ImagePaths = ["./"];

class Card extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: true
          }
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false
        },
        type: {
          type: DataTypes.ENUM,
          values: CardTypes,
          allowNull: false
        },
        imagePath: {
          type: DataTypes.ENUM,
          values: ImagePaths,
          allowNull: false
        }
      },
      {
        sequelize,
        modelName: "card",
        underscored: true
      }
    );
  }

  static associate(models) {
    Card.hasMany(models.CardData);
    Card.hasMany(models.PhysicalCard);
    Card.hasMany(models.DeckCard);
  }

  static parse(data) {
    let card = {
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type,
      imagePath: data.imagePath
    };

    data.cardData.forEach(data => {
      card[data.type] = JSON.parse(data.data);
    });

    return card;
  }
}

module.exports = Card;
