/* eslint-disable no-unused-vars */
function getTargetCard() {
  // console.log("Who would you like to target?");
  // User clicks on target creature or player
  // That object is the return type of the spells
}

function checkCondition(targetedCard) {
  if (targetedCard.cardData.defense <= 0) {
    // write discard function
  }
}

function targetedSpell(type, value, racial = null) {
  if (type === "directDamage") {
    targetedCard.cardData.defense -= value;
    checkCondition(targetedCard);
  } else if (type === "directHealing") {
    targetedCard.cardData.defense += value;
  } else if (type === "increaseBoth") {
    targetCard.cardData.defense += value;
    targetCard.cardData.attack += value;
  }
}
