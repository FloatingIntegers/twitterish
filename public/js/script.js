/* global io, createDomHelpers */
const tweetInput = document.getElementById('tweetInput');
const dashboard = document.getElementById('dashboard');

const socket = io();


// const clearDashboard = () => {
//   Array.from(dashboard.childNodes).forEach(node => {
//     dashboard.removeChild(node);
//   });
// };

// const fetch = (url, cb = () => {}) => {
//   const xhr = new XMLHttpRequest();
//
//   xhr.addEventListener('load', () => {
//     cb(xhr.responseText);
//   });
//
//   xhr.open('GET', url);
//   xhr.send();
// };
//
// const post = (url, objData, cb = () => {}) => {
//   const xhr = new XMLHttpRequest();
//
//   xhr.addEventListener('load', () => {
//     cb(xhr.responseText);
//   });
//
//   xhr.open('POST', url);
//   xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
//   xhr.send(JSON.stringify(objData));
// };

// const tweets = {
//   get(cb) {
//     fetch('/get-tweets', cb);
//   },
//
//   post(tweet, cb) {
//     post('/set-tweet', { tweet }, cb);
//   },
// };

// const printTweetsToPage = (data) => {
//   clearDashboard();
//   data.forEach((tweetObj) => {
//     const tweetWrapper = document.createElement('div');
//     const tweetText = document.createTextNode(tweetObj.tweet);
//     tweetWrapper.appendChild(tweetText);
//     dashboard.appendChild(tweetWrapper);
//   });
// };

const { addChildren, removeChildren } = createDomHelpers(document);

const printTweetsToPage = (tweets) => {
  removeChildren(dashboard);
  addChildren(tweets.map(tweet => tweet.tweet), dashboard);
};

document.getElementById('tweetButton').addEventListener('click', () => {
  // tweets.post(tweetInput.value);
  socket.emit('tweet', { tweet: tweetInput.value });
});

socket.on('tweet-update', printTweetsToPage);


// tweets.get((data) => {
//   console.log(JSON.parse(data));
//   printTweetsToPage(JSON.parse(data));
// });
