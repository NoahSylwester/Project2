var chosenDeckId;
$("#battle").on("click", event => {
  event.preventDefault();
  $.ajax({
    url: "/api/decks/",
    method: "GET",
    contentType: "application/json"
  }).then(data => {
    $(".menu")
      .empty()
      .css({ display: "block", margin: "0 25% 0 25%" });

    data.forEach(deck => {
      $(".menu").append(
        $(
          `<a href="/game"><button class='btn btn-lg btn-dark deck-choice' data-id='${deck.id}'>${deck.name}</button></a>`
        )
      );
    });

    $(".deck-choice").on("click", function() {
      chosenDeckId = $(this).data("id");
      localStorage.setItem({ deckId: chosenDeckId });
    });
  });
});
