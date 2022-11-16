$(document).ready(function() {
  //Character counter function on input
  $('#tweet-text').on("input", function() {
    const charCount = $(this).val().length;
    const count = (140 - charCount);
    const counter = $(".counter");
    counter.text(count);
    //If the count is less than zero, turn text red
    if (count < 0) {
      counter.addClass("red");
    } else {
      counter.removeClass("red");
    }
  });
});