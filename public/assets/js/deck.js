function getSelectedCardCount() {
  return $(".deck-area img").length;
}
function updateSelectedCardCount() {
  let count = getSelectedCardCount();
  if (count > 0) {
    $("#deck-top").text(`Deck (${count})`);
  } else {
    $("#deck-top").text("Deck");
  }
}

// max deck size
const maxDeckSize = 30;
// save deck already clicked?
var isNotAlreadyClicked = true;

$.ajax({
  url: "/api/cards",
  method: "GET",
  contentType: "application/json"
}).then(res => {
  if (Array.isArray(res)) {
    res.forEach(card => {
      let { title, imagePath, id } = card;
      let htmlCard = $(
        `<img src="./assets/img/cardArt/${imagePath}" alt="${title}">`
      );
      htmlCard.addClass("card-img");
      htmlCard.data("id", id);
      $(".build-area").append(htmlCard);
    });
  }
});

// event listener for cards in build area
$(".build-area").on("click", ".card-img", function(event) {
  if (getSelectedCardCount() < maxDeckSize) {
    event.preventDefault();
    // create img tag to place in chosen area
    let id = $(this).data("id");
    let imgPath = $(this).attr("src");
    let alt = $(this).attr("alt");

    let newCard = $(`<img src="${imgPath}" alt="${alt}">`);

    newCard.addClass("deck-card-img");
    newCard.data("id", id);

    // add event listener to created tag
    newCard.on("click", function(event) {
      event.preventDefault();
      $(this).remove();
      updateSelectedCardCount();
    });

    $(".deck-area").append(newCard);
    // update deck count
    updateSelectedCardCount();
  }
});
$("#save-deck").on("click", function(event) {
  event.preventDefault();
  if (isNotAlreadyClicked) {
    var name = $("#deck-name")
      .val()
      .trim();
    if (!name) {
      return;
    }

    isNotAlreadyClicked = false;

    // disable modal close
    $("#create-deck").attr({
      "data-backdrop": "static",
      "data-keyboard": "false"
    });

    let cards = {};

    $.each($(".deck-area img"), (index, card) => {
      let cardId = $(card).data("id");
      if (cards[cardId]) {
        cards[cardId].count++;
      } else {
        cards[cardId] = {
          cardId,
          count: 1
        };
      }
    });

    let deck = {
      name,
      deckCards: Object.values(cards)
    };

    let alias = "A";
    // POST deck
    $.ajax(`/api/players/${alias}/decks`, {
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(deck),
      success: res => {
        console.log(res);
      }
    })
      // eslint-disable-next-line no-unused-vars
      .then(res => {
        $(".modal-header").html(
          // eslint-disable-next-line prettier/prettier
          "<h5 class=\"modal-title\" id=\"nameModalLabel\">Your deck has been saved</h5>"
        );
        setTimeout(() => {
          location.replace("/menu");
        }, 750);
      })
      .catch(err => {
        $(".modal-header").html(
          // eslint-disable-next-line prettier/prettier
          "<h5 class=\"modal-title\" id=\"nameModalLabel\">An error has occurred</h5>"
        );
        $(".modal-body").html(err);
      });
  }
});
