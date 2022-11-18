$(document).ready(function() {
  //Making sure jQuery is ready
  console.log("Document Ready!");

  //Create Tweet Element function
  const createTweetElement = function(data) {
    //Get date using Time Ago
    let date = timeago.format(data.created_at);
    //Variable for text from user
    let textFromUser = data.content.text;
    //Escape function
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    //Variable for safe HTML
    const safeHTML = `<p>${escape(textFromUser)}</p>`;
    const $tweet = $(`<article class ="tweet">
    <header>
      <div>
        <img src="${data.user.avatars}" alt="profile-pic" class="profile">
          <p>${data.user.name}</p>
        <span id="handle">
          <p>${data.user.handle}</p>
        </span>
      </div>
      <h3>${safeHTML}</h3>
    </header>
    <footer>
    <p id="date">${date}</p>
    <p id="icons"><i class="fa-solid fa-flag"></i> <i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></p>
    </footer>
    </article>`);
    return $tweet;
  };

  //Variable for new tweet form
  const $form = $(".new-tweet form");
  //Listen for form submissions
  $form.on("submit", function(event) {
    //Prevent the form from loading a new page
    event.preventDefault();
    //If tweet is over 140 characters, display an error alert
    if ($("#tweet-text").val().length > 140) {
      alert("Sorry, tweets over 140 characters are not allowed. Please delete some text and try again.");
      //If tweet is blank, display an error altert
    } else if ($("#tweet-text").val() === "") {
      alert("Sorry, a tweet cannot be blank. Please add some text and try again.");
    } else {
      //If no errors, serialize the form data & send it to the server as a query string
      //Reload page on success
      let serializeData = $(this).serialize();
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: serializeData,
        success: function() {
          location.reload();
        }
      });
    }
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