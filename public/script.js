

const fetch = (url, cb = () => {}) => {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    cb(xhr.responseText);
  });

  xhr.open('GET', url);
  xhr.send();
};

const post = (url, objData, cb = () => {}) => {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    cb(xhr.responseText);
  });

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify(objData));
};

const tweets = {
  get(cb) {
    fetch('/get-tweets', cb);
  },

  post(tweet, cb) {
    post('/set-tweet', { tweet }, cb);
  },
};

const tweetText = document.getElementById('tweetText');

document.getElementById('tweetButton').addEventListener('click', () => {
  tweets.post(tweetText.value);
});

tweets.get((data) => console.log(JSON.parse(data)));
