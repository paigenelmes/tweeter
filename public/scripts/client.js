$(document).ready(function() {
  //Making sure jQuery is ready
  console.log("Document Ready!");

  //Create Tweet Element function
  const createTweetElement = function(data) {
    //Get date using Time Ago
    let date = timeago.format(data.created_at);
    const $tweet = $(`<article class ="tweet">
    <header>
      <div>
        <img src="${data.user.avatars}" alt="profile-pic" class="profile">
          <p>${data.user.name}</p>
        <span id="handle">
          <p>${data.user.handle}</p>
        </span>
      </div>
      <h3>${data.content.text}</h3>
    </header>
    <footer>
    <p id="date">${date}</p>
    <p id="icons"><i class="fa-solid fa-flag"></i> <i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></p>
    </footer>
    </article>`);
    return $tweet;
  };

  //Variables for new tweet form & tweet text
  const $form = $(".new-tweet form");
  const $tweetText = $("#tweet-text");
  console.log("Tweet Text", $tweetText);
  //Listen for form submissions
  $form.on("submit", function(event) {
    //Prevent the form from loading a new page
    event.preventDefault();
    let serializeData = $(this).serialize();
    //Serialize the form data & send it to the server as a query string
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: serializeData,
    });
  });

  //Render Tweets function
  const renderTweets = function(tweets) {
    //Loop through tweets
    for (const tweet of tweets) {
      //Call create tweet element function for each tweet
      const $tweet = createTweetElement(tweet);
      //Take return value & prepend it to tweet container
      $("#tweet-container").prepend($tweet);
    }
  };

  //Load Tweets function
  const loadTweets = function() {
    $.ajax({
      url: "/tweets",
      method: "GET",
    })
      .then((response) => renderTweets(response));
  };
  loadTweets();
});