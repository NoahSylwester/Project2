const { Model, DataTypes } = require("sequelize");

const CardTypes = ["monster", "spell", "secret"];

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
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          }
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
    if (Array.isArray(data)) {
      return data.map(data => Card.parse(data));
    }

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

  static post(data, models) {
    let { title, description, type, imagePath, cardData } = data;

    let badData = false;
    if (
      typeof title === "undefined" ||
      typeof description === "undefined" ||
      typeof type === "undefined" ||
      typeof imagePath === "undefined" ||
      typeof cardData !== "object"
    ) {
      badData = true;
    } else {
      if (!Array.isArray(cardData)) {
        cardData = Object.entries(cardData).map(entry => {
          let [type, data] = entry;
          return { type, data };
        });
      }
      let types = models.CardData.rawAttributes.type.values;
      cardData.forEach(data => {
        if (badData) {
          return;
        }
        if (!data.type || !data.data || !types.includes(data.type)) {
          badData = true;
        }
      });
    }

    return new Promise(resolve => {
      if (badData) {
        return resolve({
          status: 400,
          statusText: "BAD DATA",
          data
        });
      }

      cardData.forEach(data => {
        if (typeof data.data !== "string") {
          data.data = JSON.stringify(data.data);
        }
        return data;
      });

      Card.create(
        {
          title,
          description,
          type,
          imagePath,
          cardData
        },
        { include: [models.CardData] }
      )
        .then(data => data.get({ plain: true }))
        .then(newCard => {
          return resolve({
            status: 200,
            statusText: "OK",
            card: models.Card.parse(newCard)
          });
        })
        .catch(err => {
          console.error(err);
          return resolve({
            status: 422,
            statusText: "FAILED",
            data
          });
        });
    });
  }
}

module.exports = Card;
