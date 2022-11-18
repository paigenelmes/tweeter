//User & Tweet Data
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
      "text": "Je pense, donc je suis"
    },
    "created_at": 1668480817450
  }
];

//Function to find the amount of time passed since the tweet was posted
const timeSince = function(date) {
  if (typeof date !== 'object') {
    date = new Date(date);
  }

  let seconds = Math.floor((new Date() - date) / 1000);
  let intervalType;

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = 'year';
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = 'month';
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = 'day';
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "hour";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = "minute";
          } else {
            interval = seconds;
            intervalType = "second";
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += 's';
  }

  return (`${interval} ${intervalType} ago`);
};

$(document).ready(function() {
  //Making sure jQuery is ready
  console.log("Document Ready!");
  //Create Tweet Element function
  const createTweetElement = function(data) {
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
    <p id="date">${timeSince(data.created_at)}</p>
    <p id="icons"><i class="fa-solid fa-flag"></i> <i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></p>
    </footer>
    </article>`);
    return $tweet;
  };

  //New Tweet form
  const form = $(".new-tweet form");
  //Listen for form submissions
  form.on("submit", (event) => {
    //Prevent the form from loading a new page
    event.preventDefault();
    //Serialize the form data & send it to the server as a query string
    $.ajax({
      url: "/tweets",
      data: $(this).serialize(),
      success: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  });


  //Render Tweets function
  const renderTweets = function(tweets) {
    //Loop through tweets
    for (const tweet of tweets) {
      //Call create tweet element function for each tweet
      const $tweet = createTweetElement(tweet);
      //Take return value & append it to tweet container
      $("#tweet-container").append($tweet);
    }
  };
  renderTweets(data);

});