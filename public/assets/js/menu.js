var chosenDeckId;
$("#battle").on("click", function(event) {
  event.preventDefault();
  let requestUrl = "/api/decks/";
  $.ajax(requestUrl, {
    method: GET
  }).then(function(data) {
    $(".menu")
      .empty()
      .css({ display: "block", margin: "0 25% 0 25%" });
    for (deck in data) {
      $(".menu").append(
        $(
          `<a href="/game"><button class='btn btn-lg btn-dark deck-choice' data-id='${deck.id}'>${deck.name}</button></a>`
        )
      );
    }
    $(".deck-choice").on("click", function() {
      chosenDeckId = $(this).data("id");
      localStorage.setItem({ deckId: chosenDeckId });
    });
  });
});
