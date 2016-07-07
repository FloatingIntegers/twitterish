

const fetch = (url, cb) => {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    cb(xhr.responseText);
  });

  xhr.open('GET', url);
  xhr.send();
};

const post = (url, objData, cb) => {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    cb(xhr.responseText);
  });

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify(JSON.stringify(objData)));
};

const tweets = {
  get(cb) {
    fetch('/get-tweets', cb);
  },

  post(tweet) {
    post('/set-tweet', { tweet }, () => {
      console.log('tweet set');
    });
  },
};

const tweetText = document.getElementById('tweetText');

document.getElementById('tweetButton').addEventListener('click', () => {
  console.log('button clicked', tweetText.value);
  tweets.post(tweetText.value);
});


// const tweets = {
//   get() {
//     const xhr = new XMLHttpRequest();
//     xhr.addEventListener('load', () => {
//       return xhr.responseText;
//     })
//   }
// }
