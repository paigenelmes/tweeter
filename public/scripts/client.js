//It would be nice if we could import this data instead of copy/pasting it. Let's ask.
//I tried require, fetch (local) & fetch (github link) but I couldn't get anything to work.

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1668394417450
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1668480817450
  }
];

$(document).ready(function() {
  //Making sure jQuery is ready
  console.log("Document Ready!");
  //Create tweet function
  const createTweets = function(data) {
    const $tweet = $(`<article class ="tweet">
    <header>
    <p>"User name, profile pic & handle goes here"</p>
    </header>
    <p>"Tweet goes here"</p>
    <footer>
    <p>"Date goes here"</p>
    <p id="icons"><i class="fa-solid fa-flag"></i> <i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></p>
    </footer>
    </article>`);
    return $tweet;
  };
  //Display tweets function
  const displayTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweets(tweet);
      $("#tweet-container").append($tweet);
    }
  };
  displayTweets(data);

});



