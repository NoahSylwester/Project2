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
  function getTargetCard() {
    // console.log("Who would you like to target?");
  
    // User clicks on target creature or player
    // That object is the return type of the spells
  }
  
  function checkCondition(targetedCard) {
    if (targetedCard.cardData.defense <= 0){
      // write discard function
    }
  }
  
  function targetedSpell(type, value, ) {
  
    if (type == "directDamage") {
      targetedCard.cardData.defense -= value;
  
      checkCondition(targetedCard);
    }
    else if (type == "directHealing") {
      targetedCard.cardData.defense += value;
    }
    else if (type == "destroyCreature") {
      targetedCard.cardData.defense = 0;
      checkCondition(targetedCard);
    }
    else if (type == "increaseAttack") {
      targetedCard.cardData.attack += value;
    }
    else if (type == "increaseDefense") {
      targetCard.cardData.defense += value;
    }
    else if (type == "decreaseAttack") {
      targetedCard.cardData.attack -= value;
      if (targetedCard.cardData.attack < 0) {
        targetedCard.cardData.attack = 0;
      }
    }
    else if (type == "decreaseDefense") {
      targetedCard.cardData.defense -= value;
      if (targetedCard.cardData.defense <= 0) {
        targetedCard.cardData.defense = 1;
      }
    }
  
}



module.exports = Card;
