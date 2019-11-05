/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/*
still to do:
show card on use
make draws and playing cards deplete mana

*/

// initialize random card id value
var cardId = Math.random();

// player turn boolean (false until changed by the server)
var isPlayerTurn = false;

// define canvas
var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

const maxCanvasWidth = 800;
var minCanvasHeight = canvas.width * (5 / 7);

// set canvas dimensions
if (window.innerWidth < maxCanvasWidth) {
  canvas.width = window.innerWidth;
} else {
  canvas.width = maxCanvasWidth;
}
if (window.innerHeight > minCanvasHeight) {
  canvas.height = window.innerHeight;
} else {
  canvas.height = minCanvasHeight;
}

// functions
const update = function(radians) {
  let width = canvas.width;

  // increase size if grabbed
  if (this.grabbed) {
    this.sprite.width = (canvas.width / 10) * grabSizeMultiplier;
    this.sprite.height =
      (canvas.width / 10) * (2000 / 1422) * grabSizeMultiplier;
  } else {
    this.sprite.width = width / 10;
    this.sprite.height = (width / 10) * (2000 / 1422);
  }

  // track cursor
  if (this.grabbed) {
    this.x = cursor.x - this.sprite.width / 2;
    this.y = cursor.y - this.sprite.height / 2;
  }
  // check if selected by hover
  if (
    currentGrabbedCard !== undefined &&
    opponent.selected === false &&
    player.selected === false
  ) {
    // check if selected via drag and not deck
    let check1 =
      currentGrabbedCard.cardSprite.x +
      currentGrabbedCard.cardSprite.sprite.width / 2 >=
      this.x + this.x * 0.001;
    let check2 =
      currentGrabbedCard.cardSprite.x +
      currentGrabbedCard.cardSprite.sprite.width / 2 <=
      this.x + this.sprite.width - (this.x + this.sprite.width) * 0.001;
    let check3 =
      currentGrabbedCard.cardSprite.y +
      currentGrabbedCard.cardSprite.sprite.height / 6 >=
      this.y + this.y * 0.001;
    let check4 =
      currentGrabbedCard.cardSprite.y +
      currentGrabbedCard.cardSprite.sprite.height / 6 <=
      this.y + this.sprite.height - (this.y + this.sprite.height) * 0.001;
    let check5 = this !== currentGrabbedCard.cardSprite;
    let check6 = (function(arg) {
      for (let i = 0; i < playerDeck.length; i++) {
        if (playerDeck[i].cardSprite === arg) {
          return false;
        }
      }
      return true;
    })(this);
    let check7 = (function(arg) {
      for (let i = 0; i < enemyDeck.length; i++) {
        if (enemyDeck[i].cardSprite === arg) {
          return false;
        }
      }
      return true;
    })(this);
    if (check1 && check2 && check3 && check4 && check5 && check6 && check7) {
      this.selected = true;
      unselect();
      select(this);
    } else {
      this.selected = false;
    }
  }
  // un-highlights card if ability is used on it
  else {
    this.selected = false;
  }
  // end check
  // check if rotated
  if (radians !== undefined) {
    this.draw(radians);
  } else {
    this.draw();
  }
};
const draw = function(radians) {
  // handle different length numbers for atk and def and cost, to be used in drawing text
  let atkTextAdjust;
  if (this.atk.toString().length > 1) {
    atkTextAdjust = (this.sprite.width * 1) / 50;
  } else {
    atkTextAdjust = (this.sprite.width * 1) / 19;
  }
  let defTextAdjust;
  if (this.def.toString().length > 1) {
    defTextAdjust = (this.sprite.width * 1) / 50;
  } else {
    defTextAdjust = (this.sprite.width * 1) / 19;
  }
  let costTextAdjust;
  if (this.cost.toString().length > 1) {
    costTextAdjust = (this.sprite.width * 1) / 50;
  } else {
    costTextAdjust = (this.sprite.width * 1) / 19;
  }
  // check if radian input given card and not grabbed, rotate if so
  if (radians !== undefined && this.grabbed === false) {
    c.translate(
      this.x + this.sprite.width / 2,
      this.y + this.sprite.height / 2
    );
    c.rotate(radians);
    c.drawImage(
      this.sprite.img,
      -this.sprite.width / 2,
      -this.sprite.height / 2 + (Math.abs(radians) + 1) ** 3 * 12,
      this.sprite.width,
      this.sprite.height
    );
    if (this.sprite.img !== cardBack) {
      // write atk and def if face-up
      c.fillStyle = "#cccccc";
      c.font = `${this.sprite.height / 8}px Monaco`;

      // write name
      c.fillText(
        this.name,
        -this.sprite.width / 2 + (this.sprite.width * 2) / 19,
        -this.sprite.height / 2 +
        (Math.abs(radians) + 1) ** 3 * 12 +
        (this.sprite.height * 123) / 184,
        this.sprite.width / 2
      );
      // write cost
      c.fillText(
        this.cost,
        -this.sprite.width / 2 + costTextAdjust,
        -this.sprite.height / 2 +
        (Math.abs(radians) + 1) ** 3 * 12 +
        (this.sprite.height * 4) / 31,
        this.sprite.width / 6
      );
      // write atk
      c.fillText(
        this.atk,
        -this.sprite.width / 2 + atkTextAdjust,
        -this.sprite.height / 2 +
        (Math.abs(radians) + 1) ** 3 * 12 +
        (this.sprite.height * 27) / 28,
        this.sprite.width / 6
      );
      // write def
      c.fillText(
        this.def,
        -this.sprite.width / 2 + (this.sprite.width * 31) / 40 + defTextAdjust,
        -this.sprite.height / 2 +
        (Math.abs(radians) + 1) ** 3 * 12 +
        (this.sprite.height * 27) / 28,
        this.sprite.width / 6
      );
    }
    c.rotate(-radians);
    c.translate(
      -(this.x + this.sprite.width / 2),
      -(this.y + this.sprite.height / 2)
    );
  } else if (this.selected) {
    // highlight selected card
    let selectedGlowWidth = (this.sprite.width * 15) / 14;
    let selectedGlowHeight = (this.sprite.height * 15) / 14;
    let selectedGlowX = this.x - (selectedGlowWidth - this.sprite.width) / 2;
    let selectedGlowY = this.y - (selectedGlowHeight - this.sprite.height) / 2;
    c.fillStyle = "#143a0cc5";
    c.fillRect(
      selectedGlowX,
      selectedGlowY,
      selectedGlowWidth,
      selectedGlowHeight
    );
    c.drawImage(
      this.sprite.img,
      this.x,
      this.y,
      this.sprite.width,
      this.sprite.height
    );
    if (this.sprite.img !== cardBack) {
      // write atk and def if face-up
      c.fillStyle = "#cccccc";
      c.font = `${this.sprite.height / 8}px Monaco`;

      // write name
      c.fillText(
        this.name,
        this.x + (this.sprite.width * 2) / 19,
        this.y + (this.sprite.height * 123) / 184,
        this.sprite.width / 2
      );
      // write cost
      c.fillText(
        this.cost,
        this.x + costTextAdjust,
        this.y + (this.sprite.height * 4) / 31,
        this.sprite.width / 6
      );
      // write atk
      c.fillText(
        this.atk,
        this.x + atkTextAdjust,
        this.y + (this.sprite.height * 27) / 28,
        this.sprite.width / 6
      );
      // write def
      c.fillText(
        this.def,
        this.x + (this.sprite.width * 31) / 40 + defTextAdjust,
        this.y + (this.sprite.height * 27) / 28,
        this.sprite.width / 6
      );
    }
  } else if (this.enemyGrabbed) {
    // highlight selected card
    let selectedGlowWidth = (this.sprite.width * 15) / 14;
    let selectedGlowHeight = (this.sprite.height * 15) / 14;
    let selectedGlowX = this.x - (selectedGlowWidth - this.sprite.width) / 2;
    let selectedGlowY = this.y - (selectedGlowHeight - this.sprite.height) / 2;
    c.fillStyle = "#12328a";
    c.fillRect(
      selectedGlowX,
      selectedGlowY,
      selectedGlowWidth,
      selectedGlowHeight
    );
    c.drawImage(
      this.sprite.img,
      this.x,
      this.y,
      this.sprite.width,
      this.sprite.height
    );
    if (this.sprite.img !== cardBack) {
      // write atk and def if face-up
      c.fillStyle = "#cccccc";
      c.font = `${this.sprite.height / 8}px Monaco`;

      // write name
      c.fillText(
        this.name,
        this.x + (this.sprite.width * 2) / 19,
        this.y + (this.sprite.height * 123) / 184,
        this.sprite.width / 2
      );
      // write cost
      c.fillText(
        this.cost,
        this.x + costTextAdjust,
        this.y + (this.sprite.height * 4) / 31,
        this.sprite.width / 6
      );
      // write atk
      c.fillText(
        this.atk,
        this.x + atkTextAdjust,
        this.y + (this.sprite.height * 27) / 28,
        this.sprite.width / 6
      );
      // write def
      c.fillText(
        this.def,
        this.x + (this.sprite.width * 31) / 40 + defTextAdjust,
        this.y + (this.sprite.height * 27) / 28,
        this.sprite.width / 6
      );
    }
  } else if (this.enemySelected) {
    // highlight selected card
    let selectedGlowWidth = (this.sprite.width * 15) / 14;
    let selectedGlowHeight = (this.sprite.height * 15) / 14;
    let selectedGlowX = this.x - (selectedGlowWidth - this.sprite.width) / 2;
    let selectedGlowY = this.y - (selectedGlowHeight - this.sprite.height) / 2;
    c.fillStyle = "#7119ac";
    c.fillRect(
      selectedGlowX,
      selectedGlowY,
      selectedGlowWidth,
      selectedGlowHeight
    );
    c.drawImage(
      this.sprite.img,
      this.x,
      this.y,
      this.sprite.width,
      this.sprite.height
    );
    if (this.sprite.img !== cardBack) {
      // write atk and def if face-up
      c.fillStyle = "#cccccc";
      c.font = `${this.sprite.height / 8}px Monaco`;

      // write name
      c.fillText(
        this.name,
        this.x + (this.sprite.width * 2) / 19,
        this.y + (this.sprite.height * 123) / 184,
        this.sprite.width / 2
      );
      // write cost
      c.fillText(
        this.cost,
        this.x + costTextAdjust,
        this.y + (this.sprite.height * 4) / 31,
        this.sprite.width / 6
      );
      // write atk
      c.fillText(
        this.atk,
        this.x + atkTextAdjust,
        this.y + (this.sprite.height * 27) / 28,
        this.sprite.width / 6
      );
      // write def
      c.fillText(
        this.def,
        this.x + (this.sprite.width * 31) / 40 + defTextAdjust,
        this.y + (this.sprite.height * 27) / 28,
        this.sprite.width / 6
      );
    }
  } else {
    // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
    c.drawImage(
      this.sprite.img,
      this.x,
      this.y,
      this.sprite.width,
      this.sprite.height
    );
    if (this.sprite.img !== cardBack) {
      // write atk and def if face-up
      c.fillStyle = "#cccccc";
      c.font = `${this.sprite.height / 8}px Monaco`;

      // write name
      c.fillText(
        this.name,
        this.x + (this.sprite.width * 2) / 19,
        this.y + (this.sprite.height * 123) / 184,
        this.sprite.width / 2
      );
      // write cost
      c.fillText(
        this.cost,
        this.x + costTextAdjust,
        this.y + (this.sprite.height * 4) / 31,
        this.sprite.width / 6
      );
      // write atk
      c.fillText(
        this.atk,
        this.x + atkTextAdjust,
        this.y + (this.sprite.height * 27) / 28,
        this.sprite.width / 6
      );
      // write def
      c.fillText(
        this.def,
        this.x + (this.sprite.width * 31) / 40 + defTextAdjust,
        this.y + (this.sprite.height * 27) / 28,
        this.sprite.width / 6
      );
    }
  }
};

const parseCards = function(array, img) {
  // necessary to re-add functions and img to cards after they go through the server
  for (let i = 0; i < array.length; i++) {
    // adds canvas functions
    array[i].cardSprite.draw = draw;
    array[i].cardSprite.update = update;
    // adds img data
    array[i].cardSprite.sprite.img = img;
  }
};

// arrays of cards
var arrayOfPlayerCards = [];
var playerHand = [];
var playerField = [];
var playerDeck = [];
var arrayOfOpponentCards = [];
var enemyHand = [];
var enemyField = [];
var enemyDeck = [];

// define card arena areas
// player zone
var playerFieldY = canvas.height * (14 / 20);
var playerHandY = canvas.height * (19 / 20);
var playerDeckX = canvas.width * (19 / 20);
var playerZone = (canvas.height * 13) / 16;
// enemy zone
var enemyFieldY = canvas.height * (6 / 20);
var enemyHandY = -12; //canvas.height * (1/20);
var enemyDeckY = canvas.height * (1 / 20);
var enemyDeckX = canvas.width * (1 / 20);
var enemyZone = (canvas.height * 1) / 8;
// buttons
var buttonArray = [];
// menu buttons
var menuButtons = [];

// max hand size
const maxHandSize = 7;
// max field size
const maxFieldSize = 6;
// hand fan angle
const handArcAngle = Math.PI / 3;
// current grabbed card
var currentGrabbedCard;

// misc variables
var arrayOfStatusEffectImages = [];
var currentGrabbedIndex;
var grabSizeMultiplier = 10 / 9;
var zoomedCard;
var enemyUsedCard;
// indicates when to open battle menu
var isBattleMenuOpen = false;
// stores selection of highlighted player when menu opens
var playerHighlight = false;
var opponentHighlight = false;
// stores used card
var usedCard;
// stores targeted card
var targetedCard;

// bug fix to prevent doubleclick from zooming on second card drawn from deck quickly
var isDeckClicked = false;

const cardFront = document.querySelector("#card-front");
const cardBack = document.querySelector("#card-back");

var width = canvas.width;

// cursor attributes
var cursor = {
  x: 0,
  y: 0,
  w: 5,
  h: 5,

  draw: function() {
    // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);

    c.beginPath();
    c.rect(this.x, this.y, this.w, this.h);
    c.stroke();
  },

  update: function() {
    // this.dx = 0; this.dy = 0;
    this.draw();
  }
};

// window events
window.addEventListener("resize", function() {
  // reset field cards positions proportional to last position/window before resetting widths
  for (let i = 0; i < playerField.length; i++) {
    // not quite right here.. still movement downward and left
    if (window.innerHeight > minCanvasHeight) {
      playerField[i].cardSprite.y =
        (playerField[i].cardSprite.y / canvas.height) * window.innerHeight;
    }
    if (window.innerWidth < maxCanvasWidth) {
      playerField[i].cardSprite.x =
        (playerField[i].cardSprite.x / canvas.width) * window.innerWidth;
    }
  }
  // adjust canvas width and height according to min and max values
  if (window.innerWidth < maxCanvasWidth) {
    canvas.width = window.innerWidth;
  } else {
    canvas.width = maxCanvasWidth;
  }
  minCanvasHeight = canvas.width * (5 / 7);
  if (window.innerHeight > minCanvasHeight) {
    canvas.height = window.innerHeight;
  } else {
    canvas.height = minCanvasHeight;
  }

  // reset zone locations
  playerFieldY = canvas.height * (14 / 20);
  playerHandY = canvas.height * (19 / 20);
  playerDeckX = canvas.width * (19 / 20);
  playerZone = (canvas.height * 13) / 16;
  enemyFieldY = canvas.height * (6 / 20);
  enemyHandY = -12;
  enemyDeckY = canvas.height * (1 / 20);
  enemyDeckX = canvas.width * (1 / 20);
  enemyZone = (canvas.height * 1) / 8;
});
window.addEventListener("orientationchange", function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // reset zone locations
  playerFieldY = canvas.height * (14 / 20);
  playerHandY = canvas.height * (19 / 20);
  playerDeckX = canvas.width * (19 / 20);
  playerZone = (canvas.height * 13) / 16;
  enemyFieldY = canvas.height * (6 / 20);
  enemyHandY = -100;
  enemyDeckY = canvas.height * (1 / 20);
  enemyDeckX = canvas.width * (1 / 20);
  enemyZone = (canvas.height * 1) / 8;
});

// define functions to use
// socket event functions
function grab(boolean) {
  if (boolean) {
    socket.emit("grab", { grabbedCard: currentGrabbedCard });
  } else {
    // keep cards selected until menu is closed
    if (isBattleMenuOpen === false) {
      socket.emit("release");
    }
  }
}
function select(cardSprite) {
  socket.emit("select", { selectedCardSprite: cardSprite });
}
function unselect() {
  // keep cards selected until menu is closed
  if (isBattleMenuOpen === false) {
    socket.emit("unselect");
  }
}
function use() {
  socket.emit("use", {
    usedCard: usedCard,
    targetedCard: targetedCard,
    hand: playerHand,
    deck: playerDeck,
    field: playerField,
    enemyHand: enemyHand,
    enemyField: enemyField
  });
}
function play() {
  socket.emit("play", {
    mana: player.mana,
    hand: playerHand,
    deck: playerDeck,
    field: playerField
  });
}
function drawCard() {
  socket.emit("drawCard", {
    draw: player.draws,
    hand: playerHand,
    deck: playerDeck
  });
}
function end() {
  isPlayerTurn = false;
  socket.emit("end");
}
function win() {
  socket.emit("win");
}
function lose() {
  socket.emit("lose");
}
// player stat object
function Player() {
  this.hp = 25;
  this.mana = 0;
  this.draws = 6;
  this.selected = false;
}

// card constructor
function Card(img, atk, def, ability, cost = 0, name = "Monster") {
  // everything is within this cardSprite object
  this.cardSprite = {
    // initialize easy-to-verify id
    id: ++cardId,
    name: name,
    cost: cost,
    effects: [],
    atk: atk,
    def: def,
    ability: ability,
    // initialize position
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    grabbed: false,
    selected: false,
    enemyGrabbed: false,
    enemySelected: false,
    onField: false,

    sprite: {
      img: img,
      width: canvas.width / 10,
      height: (canvas.width / 10) * (2000 / 1422)
    },

    draw: draw,

    update: update
  };
}
// button constructor
function Button(text, img, id, x, y, func) {
  this.effect = func;

  this.buttonSprite = {
    // initialize random stats
    x: x,
    y: y,
    dx: 0,
    dy: 0,
    pushed: false,
    text: text,

    sprite: {
      width: canvas.width / 10,
      height: (canvas.width / 20) * (1 / 2)
    },

    draw: function() {
      // context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
      // c.drawImage(this.sprite.img, this.x, this.y, this.sprite.width, this.sprite.height);
      c.fillStyle = "#61231aec";
      c.fillRect(this.x, this.y, this.sprite.width, this.sprite.height);
      c.font = `${this.sprite.height / 2}px Monaco`;
      let xCentered =
        this.x +
        (this.sprite.width - (this.text.length * this.sprite.width) / 7) / 2;
      let yCentered = this.y + this.sprite.height / 2 + this.sprite.height / 6;
      c.fillStyle = "#cccccc";
      c.fillText(this.text, xCentered, yCentered, this.sprite.width);
      // check if pushed
      if (this.pushed) {
        // push effect
        c.fillStyle = "#0000003b";
        c.fillRect(this.x, this.y, this.sprite.width, this.sprite.height);
      }
    },

    update: function(isMenu) {
      let width = canvas.width;
      this.sprite.width = width / 10;
      this.sprite.height = (width / 10) * (1 / 2);

      if (isMenu === true) {
        this.draw();
      } else {
        this.x = (width * 17) / 20;
        this.draw();
      }
    }
  };
}

// clientside action functions
function clickDeck(array) {
  // draw a card
  if (
    cursor.x >= array[array.length - 1].cardSprite.x &&
    cursor.x <=
    array[array.length - 1].cardSprite.x +
    array[array.length - 1].cardSprite.sprite.width &&
    cursor.y >= array[array.length - 1].cardSprite.y &&
    cursor.y <=
    array[array.length - 1].cardSprite.y +
    array[array.length - 1].cardSprite.sprite.height
  ) {
    // check hand size against max
    if (playerHand.length < maxHandSize) {
      // draw card into hand, render as face-up
      array[array.length - 1].cardSprite.sprite.img = cardFront;
      playerHand.push(array.pop());
      player.draws--;
      drawCard();
    }
    // bug fix for doubleclick
    isDeckClicked = true;
  }
}
function mouseDownIteration(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (
      cursor.x >= array[i].cardSprite.x &&
      cursor.x <= array[i].cardSprite.x + array[i].cardSprite.sprite.width &&
      cursor.y >= array[i].cardSprite.y &&
      cursor.y <= array[i].cardSprite.y + array[i].cardSprite.sprite.height
    ) {
      array[i].cardSprite.grabbed = true;
      currentGrabbedCard = array[i];
      grab(true);

      // bug fix
      array[i].cardSprite.x = cursor.x - array[i].cardSprite.sprite.width / 2;
      array[i].cardSprite.y = cursor.y - array[i].cardSprite.sprite.height / 2;

      // shift location of card to top layer of canvas rendering
      if (array !== playerHand && array !== playerField) {
        var temporary = array[i];
        array.splice(i, 1);
        array.push(temporary);

        // store index of grabbed card
        currentGrabbedIndex = array.length - 1;
      } else {
        currentGrabbedIndex = i;
      }

      break;
    }
  }
}
function mouseUpIteration(array) {
  if (
    array[currentGrabbedIndex] !== undefined &&
    array[currentGrabbedIndex].cardSprite.grabbed === true
  ) {
    array[currentGrabbedIndex].cardSprite.grabbed = false;
    // makes ungrabbed cards decrease in size toward middle rather than top left
    array[currentGrabbedIndex].cardSprite.x +=
      ((width / 10) * grabSizeMultiplier - width / 10) / 2;
    array[currentGrabbedIndex].cardSprite.y +=
      ((width / 10) * grabSizeMultiplier * (2000 / 1422) -
        (width / 10) * (2000 / 1422)) /
      2;
    // check if playing cards from hand
    // check if anything selected, if dragged card is from hand, if few enough cards in field, and if dragged to field area
    if (
      !checkIfAnySelectedCards() &&
      array === playerHand &&
      playerField.length < maxFieldSize &&
      array[currentGrabbedIndex].cardSprite.y +
      array[currentGrabbedIndex].cardSprite.sprite.height / 2 <
      playerFieldY &&
      array[currentGrabbedIndex].cardSprite.y +
      array[currentGrabbedIndex].cardSprite.sprite.height / 2 >=
      canvas.height / 2
    ) {
      if (array[currentGrabbedIndex].cardSprite.cost <= player.mana) {
        // reduce mana
        player.mana -= array[currentGrabbedIndex].cardSprite.cost;
        var temp = array[currentGrabbedIndex];
        // flag that card has been played
        temp.cardSprite.onField = true;
        array.splice(currentGrabbedIndex, 1);
        // insert cards onto field in location specified by player
        if (playerField.length === 0) {
          playerField.push(temp);
        } else {
          for (let i = 0; i < playerField.length; i++) {
            if (i === 0 && temp.cardSprite.x <= playerField[i].cardSprite.x) {
              playerField.unshift(temp);
              break;
            } else if (
              i === playerField.length - 1 &&
              temp.cardSprite.x > playerField[i].cardSprite.x
            ) {
              playerField.push(temp);
              break;
            } else if (
              temp.cardSprite.x > playerField[i].cardSprite.x &&
              temp.cardSprite.x <= playerField[i + 1].cardSprite.x
            ) {
              playerField.splice(i + 1, 0, temp);
              break;
            }
          }
        }
        play();
      } else {
        alert("Not enough mana");
      }
    }
    if (currentGrabbedCard !== undefined) {
      // release grab
      grab(false);
      console.log("release");
    }
    // forget what's been grabbed
    currentGrabbedCard = undefined;
    currentGrabbedIndex = undefined;
  }
}
function checkForButtonPush() {
  // depress button on click
  for (let i = 0; i < buttonArray.length; i++) {
    if (
      cursor.x >= buttonArray[i].buttonSprite.x &&
      cursor.x <=
      buttonArray[i].buttonSprite.x +
      buttonArray[i].buttonSprite.sprite.width &&
      cursor.y >= buttonArray[i].buttonSprite.y &&
      cursor.y <=
      buttonArray[i].buttonSprite.y +
      buttonArray[i].buttonSprite.sprite.height
    ) {
      buttonArray[i].buttonSprite.pushed = true;
      break;
    }
  }
  for (let i = 0; i < menuButtons.length; i++) {
    if (
      cursor.x >= menuButtons[i].buttonSprite.x &&
      cursor.x <=
      menuButtons[i].buttonSprite.x +
      menuButtons[i].buttonSprite.sprite.width &&
      cursor.y >= menuButtons[i].buttonSprite.y &&
      cursor.y <=
      menuButtons[i].buttonSprite.y +
      menuButtons[i].buttonSprite.sprite.height
    ) {
      menuButtons[i].buttonSprite.pushed = true;
      break;
    }
  }
}
function releaseAnyPushedButton() {
  // execute button effect if cursor released still on button
  for (let i = 0; i < buttonArray.length; i++) {
    if (
      buttonArray[i].buttonSprite.pushed === true &&
      (cursor.x >= buttonArray[i].buttonSprite.x &&
        cursor.x <=
        buttonArray[i].buttonSprite.x +
        buttonArray[i].buttonSprite.sprite.width &&
        cursor.y >= buttonArray[i].buttonSprite.y &&
        cursor.y <=
        buttonArray[i].buttonSprite.y +
        buttonArray[i].buttonSprite.sprite.height)
    ) {
      buttonArray[i].buttonSprite.pushed = false;
      buttonArray[i].effect();
      break;
    } else if (buttonArray[i].buttonSprite.pushed === true) {
      buttonArray[i].buttonSprite.pushed = false;
      break;
    }
  }
  for (let i = 0; i < menuButtons.length; i++) {
    if (
      menuButtons[i].buttonSprite.pushed === true &&
      (cursor.x >= menuButtons[i].buttonSprite.x &&
        cursor.x <=
        menuButtons[i].buttonSprite.x +
        menuButtons[i].buttonSprite.sprite.width &&
        cursor.y >= menuButtons[i].buttonSprite.y &&
        cursor.y <=
        menuButtons[i].buttonSprite.y +
        menuButtons[i].buttonSprite.sprite.height)
    ) {
      menuButtons[i].buttonSprite.pushed = false;
      menuButtons[i].effect();
      break;
    } else if (menuButtons[i].buttonSprite.pushed === true) {
      menuButtons[i].buttonSprite.pushed = false;
      break;
    }
  }
}
function executeActionOnSelectedCard() {
  // use grabbed card's ability on selected card or player
  if (!player.selected && !opponent.selected) {
    let currentSelectedCard;
    for (let i = 0; i < enemyField.length; i++) {
      if (enemyField[i].cardSprite.selected) {
        currentSelectedCard = enemyField[i];
      }
    }
    for (let i = 0; i < playerField.length; i++) {
      if (playerField[i].cardSprite.selected) {
        currentSelectedCard = playerField[i];
      }
    }
    if (currentSelectedCard !== undefined) {
      usedCard = currentGrabbedCard;
      targetedCard = currentSelectedCard;
      isBattleMenuOpen = true;
    }
  }
  // execute any abilities on selected players
  else {
    if (player.selected) {
      playerHighlight = true;
    } else if (opponent.selected) {
      opponentHighlight = true;
    }
    usedCard = currentGrabbedCard;
    isBattleMenuOpen = true;
  }
}
function checkCardCoordinatesOfArray(array) {
  // check coords of all cards in the array, zoom on the one clicked
  for (let i = array.length - 1; i >= 0; i--) {
    if (
      cursor.x >= array[i].cardSprite.x &&
      cursor.x <= array[i].cardSprite.x + array[i].cardSprite.sprite.width &&
      cursor.y >= array[i].cardSprite.y &&
      cursor.y <= array[i].cardSprite.y + array[i].cardSprite.sprite.height
    ) {
      zoomedCard = array[i];
    }
  }
}
function checkIfAnySelectedCards() {
  let anySelected = false;
  // run through both field arrays to see if any are selected
  for (let i = 0; i < enemyField.length; i++) {
    if (enemyField[i].cardSprite.selected) {
      anySelected = true;
    }
  }
  for (let i = 0; i < playerField.length; i++) {
    if (playerField[i].cardSprite.selected) {
      anySelected = true;
    }
  }
  if (anySelected) {
    return true;
  }
  return false;
}
function zoomOnDoubleClickedCard() {
  checkCardCoordinatesOfArray(playerHand);
  checkCardCoordinatesOfArray(playerField);
  checkCardCoordinatesOfArray(enemyField);
}

// desktop mouse events
canvas.addEventListener("mousemove", function(event) {
  cursor.x = event.offsetX;
  cursor.y = event.offsetY;
  if (
    currentGrabbedCard !== undefined &&
    currentGrabbedCard.cardSprite.y <= enemyZone
  ) {
    opponent.selected = true;
  } else if (
    currentGrabbedCard !== undefined &&
    currentGrabbedCard.cardSprite.y >= playerZone
  ) {
    player.selected = true;
  } else {
    player.selected = false;
    opponent.selected = false;
  }
});
canvas.addEventListener("click", function(event) {
  if (zoomedCard === undefined && isPlayerTurn) {
    if (isBattleMenuOpen === false) {
      clickDeck(playerDeck);
    }
  } else {
    // escape zoom
    zoomedCard = undefined;
  }
});
canvas.addEventListener("mousedown", function(event) {
  if (isPlayerTurn) {
    if (zoomedCard === undefined) {
      checkForButtonPush();
      if (isBattleMenuOpen === false) {
        // mouseDownIteration(arrayOfPlayerCards);
        if (currentGrabbedIndex === undefined) {
          mouseDownIteration(playerHand);
          if (currentGrabbedIndex === undefined) {
            mouseDownIteration(playerField);
          }
        }
      }
    }
  }
});
canvas.addEventListener("mouseup", function(event) {
  if (isPlayerTurn) {
    if (zoomedCard === undefined) {
      releaseAnyPushedButton();
      executeActionOnSelectedCard();
      mouseUpIteration(arrayOfPlayerCards);
      mouseUpIteration(playerHand);
      mouseUpIteration(playerField);
    }
  }
});
canvas.addEventListener("dblclick", function(event) {
  if (zoomedCard === undefined && isDeckClicked === false) {
    event.preventDefault();
    zoomOnDoubleClickedCard();
  }
});

// mobile touch events (not currently functional)
canvas.addEventListener("touchmove", function(event) {
  event.preventDefault();
  cursor.x = event.offsetX;
  cursor.y = event.offsetY;
});
canvas.addEventListener("touchstart", function(event) {
  event.preventDefault();
  checkForButtonPush();
  mouseDownIteration(arrayOfPlayerCards);
  if (currentGrabbedIndex === undefined) {
    mouseDownIteration(playerHand);
    if (currentGrabbedIndex === undefined) {
      mouseDownIteration(playerField);
    }
  }
});
canvas.addEventListener("touchend", function(event) {
  event.preventDefault();
  releaseAnyPushedButton();
  mouseUpIteration(arrayOfPlayerCards);
  mouseUpIteration(playerHand);
  mouseUpIteration(playerDeck);
});

// create players

var player = new Player();
var opponent = new Player();

// create some cards

// make a deck
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);
playerDeck.push(
  new Card(
    cardBack,
    1,
    1,
    function(card) {
      card.cardSprite.name = "Dummy";
    },
    1
  )
);

playerField.push(
  new Card(cardFront, 0, 0, function(card) {
    alert("ability!");
  })
);

var endButton = new Button(
  "End",
  0,
  0,
  (canvas.width * 3) / 4,
  canvas.height / 2,
  function() {
    end();
  }
);
// var attackButton = new Button("Attack",0,0, canvas.width*3/4, canvas.height/2 - 50, function() {console.log('Attack')});
// var abilityButton = new Button("Ability",0,0, canvas.width*3/4, canvas.height/2 + 50, function() {console.log('Ability')});

// text, img, id, x, y, func
var attackButton = new Button("Attack", 0, 0, 0, 0, function() {
  // attack a card or player
  if (usedCard.cardSprite.onField === true) {
    if (opponentHighlight) {
      opponent.hp -= usedCard.cardSprite.atk;
      // check for win
      if (opponent.hp >= 0) {
        win();
      }
    } else if (playerHighlight) {
      player.hp -= usedCard.cardSprite.atk;
      // check for win
      if (player.hp >= 0) {
        lose();
      }
    } else if (targetedCard !== undefined) {
      targetedCard.cardSprite.def -= usedCard.cardSprite.atk;
      if (targetedCard.cardSprite.def <= 0) {
        for (let i = 0; i < enemyField.length; i++) {
          if (targetedCard.cardSprite.id === enemyField[i].cardSprite.id) {
            enemyField.splice(i, 1);
            break;
          }
        }
        for (let i = 0; i < playerField.length; i++) {
          if (targetedCard.cardSprite.id === playerField[i].cardSprite.id) {
            playerField.splice(i, 1);
            break;
          }
        }
      }
    }

    use();
  } else {
    alert("Card must be played first");
  }
  isBattleMenuOpen = false;
  // unhighlight cards on other board
  unselect();
  grab(false);
  playerHighlight = false;
  opponentHighlight = false;
  usedCard = undefined;
  targetedCard = undefined;
  console.log("attack");
});
var abilityButton = new Button("Ability", 0, 0, 0, 0, function() {
  // used card ability
  if (typeof usedCard.cardSprite.ability === "function") {
    // requires cost to be paid on ability usage
    if (usedCard.cardSprite.cost <= player.mana) {
      if (opponentHighlight) {
        usedCard.cardSprite.ability(targetedCard);
      } else if (playerHighlight) {
        usedCard.cardSprite.ability(targetedCard);
      } else if (targetedCard !== undefined) {
        usedCard.cardSprite.ability(targetedCard);
      }
      use();
      // check for win
      if (opponent.hp >= 0) {
        win();
      }
      if (player.hp >= 0) {
        lose();
      }
    } else {
      alert("Not enough mana!");
    }
  } else {
    alert("No ability");
  }
  playerHighlight = false;
  opponentHighlight = false;
  isBattleMenuOpen = false;
  // unhighlight cards on other board
  unselect();
  grab(false);
  usedCard = undefined;
  targetedCard = undefined;
  console.log("ability");
});
var cancelButton = new Button("Cancel", 0, 0, 0, 0, function() {
  console.log("cancel");
  playerHighlight = false;
  opponentHighlight = false;
  usedCard = undefined;
  targetedCard = undefined;
  isBattleMenuOpen = false;
  // unhighlight cards on other board
  unselect();
  grab(false);
});

buttonArray.push(endButton); //, attackButton, abilityButton);
menuButtons.push(cancelButton, attackButton, abilityButton);

// final animation loop function
function animate() {
  requestAnimationFrame(animate);

  c.clearRect(0, 0, innerWidth, 2 * innerHeight);
  // render field lines
  c.beginPath();
  // startpoint
  c.moveTo(0, canvas.height / 2);
  // endpoint
  c.lineTo(canvas.width, canvas.height / 2);
  // Make the line visible
  c.strokeStyle = "#cccccc";
  c.stroke();

  // create player turn indicators
  // player indicator
  c.beginPath();
  c.arc(
    playerDeckX - canvas.width / 20,
    playerHandY - (canvas.width / 10) * (2000 / 1422) * 1.75,
    10,
    0,
    2 * Math.PI
  );
  if (isPlayerTurn) {
    c.fillStyle = "#008000c5";
  } else {
    c.fillStyle = "#ff0000c5";
  }
  c.fill();
  c.lineWidth = 1;
  c.strokeStyle = "#cccccc";
  c.stroke();
  // enemy indicator
  c.beginPath();
  c.arc(
    enemyDeckX + canvas.width / 20,
    (canvas.width / 10) * (2000 / 1422) * 1.9,
    10,
    0,
    2 * Math.PI
  );
  if (!isPlayerTurn) {
    c.fillStyle = "#008000c5";
  } else {
    c.fillStyle = "#ff0000c5";
  }
  c.fill();
  c.lineWidth = 1;
  c.strokeStyle = "#cccccc";
  c.stroke();

  // display hp, mana, and draws for each player
  // player text
  c.fillStyle = "#cccccc";
  c.font = `${canvas.width / 50}px Monaco`;
  let playerTextY = playerHandY - (playerHandY * 1) / 30;
  c.fillText(
    `Draws: ${player.draws}`,
    playerDeckX - canvas.width / 10,
    playerTextY - (canvas.width / 10) * (2000 / 1422),
    canvas.width / 10
  );
  c.fillText(
    `Mana: ${player.mana}`,
    playerDeckX - canvas.width / 10,
    playerTextY - (canvas.width / 10) * (2000 / 1422) - canvas.width / 50,
    canvas.width / 10
  );
  c.fillText(
    `HP: ${player.hp}`,
    playerDeckX - canvas.width / 10,
    playerTextY - (canvas.width / 10) * (2000 / 1422) - (canvas.width / 50) * 2,
    canvas.width / 10
  );
  // enemy text
  //c.arc(enemyDeckX + canvas.width/20, ((canvas.width/10) * (2000/1422)) * 1.7, 10, 0, 2 * Math.PI);
  c.fillStyle = "black";
  c.font = `${canvas.width / 50}px Monaco`;
  c.fillText(
    `HP: ${opponent.hp}`,
    enemyDeckX,
    (canvas.width / 10) * (2000 / 1422) * 1.45,
    canvas.width / 10
  );
  c.fillText(
    `Mana: ${opponent.mana}`,
    enemyDeckX,
    (canvas.width / 10) * (2000 / 1422) * 1.45 + canvas.width / 50,
    canvas.width / 10
  );
  c.fillText(
    `Draws: ${opponent.draws}`,
    enemyDeckX,
    (canvas.width / 10) * (2000 / 1422) * 1.45 + (canvas.width / 50) * 2,
    canvas.width / 10
  );

  // animate any player targeting
  if (opponent.selected || opponentHighlight) {
    c.fillStyle = "#143a0c75";
    c.fillRect(0, 0, canvas.width, canvas.height / 8);
  } else if (player.selected || playerHighlight) {
    c.fillStyle = "#143a0c75";
    c.fillRect(0, (canvas.height * 7) / 8, canvas.width, canvas.height / 8);
  }

  // render enemy field cards
  for (let i = 0; i < enemyField.length; i++) {
    // displays centered player field cards
    let spacing = canvas.width / 50;
    let startPointFromLeft =
      canvas.width / 2 -
      (enemyField[i].cardSprite.sprite.width * enemyField.length) / 2 -
      (spacing / 2) * (enemyField.length - 1);
    enemyField[i].cardSprite.x =
      startPointFromLeft +
      i * enemyField[i].cardSprite.sprite.width +
      spacing * i;
    enemyField[i].cardSprite.y =
      canvas.height / 2 -
      enemyField[i].cardSprite.sprite.height -
      canvas.height / 30;
    enemyField[i].cardSprite.update();
  }
  // enemy hand
  for (let i = 0; i < enemyHand.length; i++) {
    // flip cards
    enemyHand[i].cardSprite.sprite.img = cardBack;
    // set enemy hand location correctly
    // create relative card positions in hand
    enemyHand[i].cardSprite.x =
      (canvas.width -
        enemyHand[i].cardSprite.sprite.width * (enemyHand.length / 2) +
        enemyHand[i].cardSprite.sprite.width * i) /
      2 -
      enemyHand[i].cardSprite.sprite.width / 4;
    let radians =
      (handArcAngle * (i + 0.5)) / enemyHand.length - handArcAngle / 2;
    enemyHand[i].cardSprite.y = enemyHandY;
    enemyHand[i].cardSprite.update(radians);
  }
  // enemy deck
  for (let i = 0; i < enemyDeck.length; i++) {
    enemyDeck[i].cardSprite.x = enemyDeckX;
    enemyDeck[i].cardSprite.y = enemyDeckY - i / 2;
    enemyDeck[i].cardSprite.update();
  }
  // render buttons
  let buttonSpacing = 0;
  canvas.height / 40;
  for (let i = 0; i < buttonArray.length; i++) {
    buttonArray[i].buttonSprite.y =
      canvas.height / 2 -
      (buttonArray.length *
        (buttonArray[i].buttonSprite.sprite.height + buttonSpacing * (3 / 4))) /
      2 +
      i * (buttonArray[i].buttonSprite.sprite.height + buttonSpacing);
    buttonArray[i].buttonSprite.update();
  }
  // animate player deck
  for (let i = 0; i < playerDeck.length; i++) {
    playerDeck[i].cardSprite.x = playerDeckX - canvas.width / 10;
    playerDeck[i].cardSprite.y =
      playerHandY - playerDeck[i].cardSprite.sprite.height - i / 2; // thicken deck with more cards
    playerDeck[i].cardSprite.update();
  }
  // animate player field
  if (playerField.length > 0) {
    // default lastRendered index is last item in array
    let lastRendered = playerField.length - 1;
    for (let i = 0; i <= playerField.length; i++) {
      if (i === playerField.length) {
        playerField[lastRendered].cardSprite.update();
      } else if (playerField[i].cardSprite.grabbed) {
        // stores grabbed card and waits to render it so that it appears above everything else
        lastRendered = i;
      } else {
        // displays centered player field cards
        let spacing = canvas.width / 50;
        let startPointFromLeft =
          canvas.width / 2 -
          (playerField[i].cardSprite.sprite.width * playerField.length) / 2 -
          (spacing / 2) * (playerField.length - 1);
        playerField[i].cardSprite.x =
          startPointFromLeft +
          i * playerField[i].cardSprite.sprite.width +
          spacing * i;
        playerField[i].cardSprite.y = canvas.height / 2 + canvas.height / 30; // playerFieldY - canvas.height/6;
        playerField[i].cardSprite.update();
      }
    }
  }
  // animate player hand
  for (let i = 0; i < playerHand.length; i++) {
    // set player hand location correctly
    // create relative card positions in hand
    playerHand[i].cardSprite.x =
      (canvas.width -
        playerHand[i].cardSprite.sprite.width * (playerHand.length / 2) +
        playerHand[i].cardSprite.sprite.width * i) /
      2 -
      playerHand[i].cardSprite.sprite.width / 4;
    let radians =
      (handArcAngle * (i + 0.5)) / playerHand.length - handArcAngle / 2;
    playerHand[i].cardSprite.y =
      playerHandY - playerHand[i].cardSprite.sprite.height;
    playerHand[i].cardSprite.update(radians);
  }
  // bring up attack/ability confirm
  if (isBattleMenuOpen) {
    c.fillStyle = "#cccccc";
    let menuWidth = canvas.width / 3;
    let menuHeight = 100;
    let menuX = (canvas.width * 1) / 3;
    let menuY = (canvas.height - menuHeight) / 2;
    c.fillRect(menuX, menuY, menuWidth, menuHeight);
    c.fillStyle = "#000000";
    c.font = `${menuX / 17}px Monaco`;
    c.fillText(
      "Select an action",
      menuX + (menuWidth * 21) / 100,
      menuY + 25,
      canvas.width / 3
    );
    // let buttonSpacing = 0;canvas.height/40;
    for (let i = 0; i < menuButtons.length; i++) {
      menuButtons[i].buttonSprite.x = menuX + (menuWidth / 3) * i + 3;
      menuButtons[i].buttonSprite.y = menuY + (menuHeight * 1) / 2;
      menuButtons[i].buttonSprite.update((isMenu = true));
    }
  }
  // render zoomed card
  if (zoomedCard !== undefined) {
    let zoomWidth;
    // account for a variety of screen ratios
    if (canvas.height >= canvas.width * (2 / 3) * (2000 / 1422)) {
      zoomWidth = canvas.width * (2 / 3);
    } else {
      zoomWidth = canvas.width * (1 / 2);
    }
    let zoomHeight = zoomWidth * (2000 / 1422);
    let x = canvas.width / 2 - zoomWidth / 2;
    let y = canvas.height / 2 - zoomHeight / 2;
    c.drawImage(zoomedCard.cardSprite.sprite.img, x, y, zoomWidth, zoomHeight);
    if (zoomedCard.cardSprite.sprite.img !== cardBack) {
      // handle different length numbers for atk and def, to be used in drawing text
      let atkTextAdjust;
      if (zoomedCard.cardSprite.atk.toString().length > 1) {
        atkTextAdjust = (zoomWidth * 1) / 50;
      } else {
        atkTextAdjust = (zoomWidth * 1) / 19;
      }
      let defTextAdjust;
      if (zoomedCard.cardSprite.def.toString().length > 1) {
        defTextAdjust = (zoomWidth * 1) / 50;
      } else {
        defTextAdjust = (zoomWidth * 1) / 19;
      }
      let costTextAdjust;
      if (zoomedCard.cardSprite.cost.toString().length > 1) {
        costTextAdjust = (zoomWidth * 1) / 50;
      } else {
        costTextAdjust = (zoomWidth * 1) / 19;
      }
      // write atk and def if face-up
      c.fillStyle = "#cccccc";
      c.font = `${zoomHeight / 8}px Monaco`;

      // write name
      c.fillText(
        zoomedCard.cardSprite.name,
        x + (zoomWidth * 2) / 19,
        y + (zoomHeight * 123) / 184,
        zoomWidth / 2
      );
      // write cost
      c.fillText(
        zoomedCard.cardSprite.cost,
        x + costTextAdjust,
        y + (zoomHeight * 4) / 31,
        zoomWidth / 6
      );
      // write atk
      c.fillText(
        zoomedCard.cardSprite.atk,
        x + atkTextAdjust,
        y + (zoomHeight * 27) / 28,
        zoomWidth / 6
      );
      // write def
      c.fillText(
        zoomedCard.cardSprite.def,
        x + (zoomWidth * 31) / 40 + defTextAdjust,
        y + (zoomHeight * 27) / 28,
        zoomWidth / 6
      );
    }
  }
  isDeckClicked = false;
}
animate();

// connection to server
var socket = io.connect("http://localhost");

socket.on("connected", function(data) {
  socket.emit("connected", { deck: playerDeck });
});
socket.on("disconnected", function(data) {
  alert("The other player disconnected");
});
socket.on("initialize deck", function(data) {
  socket.emit("initialize deck", { deck: playerDeck });
});
socket.on("opponent deck", function(data) {
  enemyDeck = data.deck;
  parseCards(enemyDeck, cardBack);
});
socket.on("grab", function(data) {
  for (let i = 0; i < enemyHand.length; i++) {
    if (enemyHand[i].cardSprite.id === data.grabbedCard.cardSprite.id) {
      enemyHand[i].cardSprite.enemyGrabbed = true;
    }
  }
  for (let i = 0; i < enemyField.length; i++) {
    if (enemyField[i].cardSprite.id === data.grabbedCard.cardSprite.id) {
      enemyField[i].cardSprite.enemyGrabbed = true;
    }
  }
});
socket.on("release", function() {
  for (let i = 0; i < enemyHand.length; i++) {
    enemyHand[i].cardSprite.enemyGrabbed = false;
    enemyHand[i].cardSprite.enemySelected = false;
  }
  for (let i = 0; i < enemyField.length; i++) {
    enemyField[i].cardSprite.enemyGrabbed = false;
    enemyField[i].cardSprite.enemySelected = false;
  }
  for (let i = 0; i < playerField.length; i++) {
    playerField[i].cardSprite.enemySelected = false;
  }
});
socket.on("select", function(data) {
  // assign grabbed card to be data.selectedCard
  for (let i = 0; i < enemyHand.length; i++) {
    if (enemyHand[i].cardSprite.id === data.selectedCardSprite.id) {
      enemyHand[i].cardSprite.enemySelected = true;
    }
  }
  for (let i = 0; i < enemyField.length; i++) {
    if (enemyField[i].cardSprite.id === data.selectedCardSprite.id) {
      enemyField[i].cardSprite.enemySelected = true;
    }
  }
  for (let i = 0; i < playerField.length; i++) {
    if (playerField[i].cardSprite.id === data.selectedCardSprite.id) {
      playerField[i].cardSprite.enemySelected = true;
    }
  }
});
socket.on("unselect", function() {
  for (let i = 0; i < enemyHand.length; i++) {
    enemyHand[i].cardSprite.enemySelected = false;
  }
  for (let i = 0; i < enemyField.length; i++) {
    enemyField[i].cardSprite.enemySelected = false;
  }
  for (let i = 0; i < playerField.length; i++) {
    playerField[i].cardSprite.enemySelected = false;
  }
});
socket.on("use", function(data) {
  enemyUsedCard = data.usedCard;
  enemyUsedCard.cardSprite.update = update;
  enemyUsedCard.cardSprite.draw = draw;
  enemyUsedCard.cardSprite.sprite.img = cardFront;
  // update arrays
  enemyHand = data.hand;
  enemyDeck = data.deck;
  enemyField = data.field;
  playerHand = data.enemyHand;
  playerField = data.enemyField;
  parseCards(enemyHand, cardBack);
  parseCards(enemyDeck, cardBack);
  parseCards(enemyField, cardFront);
  parseCards(playerHand, cardFront);
  parseCards(playerField, cardFront);
});
socket.on("play", function(data) {
  opponent.mana = data.mana;
  enemyHand = data.hand;
  enemyField = data.field;
  enemyDeck = data.deck;
  parseCards(enemyHand, cardBack);
  parseCards(enemyDeck, cardBack);
  parseCards(enemyField, cardFront);
});
socket.on("drawCard", function(data) {
  opponent.draws = data.draws;
  enemyHand = data.hand;
  enemyDeck = data.deck;
  parseCards(enemyHand, cardBack);
  parseCards(enemyDeck, cardBack);
});
socket.on("upkeep", function(data) {
  opponent.hp = data.hp;
  opponent.mana = data.mana;
  opponent.draws = data.draws;
});
socket.on("win", function() {
  alert("You win!");
});
socket.on("lose", function() {
  alert("You lose!");
});
socket.on("end", function(data) {
  isPlayerTurn = true;
  // limit mana to a maximum of 10
  if (player.mana < 10) {
    player.mana++;
  }
  player.draws++;
  socket.emit("upkeep", {
    hp: player.hp,
    mana: player.mana,
    draws: player.draws
  });
});
