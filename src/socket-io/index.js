/* eslint-disable no-console */
const socketIO = require('socket.io');

const redisTwitter = require('../redis-twitter');
const logError = require('../helpers/log-error');
const addSocketIO = (app) => {
  const io = socketIO(app);

  io.on('connection', socket => {
    console.log('user connected');

    redisTwitter.connect();

    redisTwitter.getTweets((err, tweets) => {
      if (err) throw err;
      socket.emit('tweet-update', tweets);
    });

    // On tweet event handler - add tweet to redis
    // then get all tweets and emit an update event
    socket.on('tweet', (tweet) => {
      // Add data to tweet
      // eslint-disable-next-line
      const un = ['Cat', 'Dog', 'Panda', 'Chicken', 'Monkey', 'Giraffe', 'Squirrel', 'Pig', 'Mouse', 'Koala'];
      const randomIndex = (arr) => arr[Math.floor(Math.random() * arr.length)];
      const tweetObj = Object.assign({ dateId: Date.now(), un: randomIndex(un) }, tweet);
      redisTwitter.addTweetsPromise(tweetObj)                     // Promise(undefined)
        .then(redisTwitter.getTweetsPromise.bind(redisTwitter))   // Promise([Tweet])
        .then(tweets => { console.log(tweets.slice(0, 5)); return tweets; })
        .then(tweets => io.emit('tweet-update', tweets))          // Promise(undefined)
        .catch(logError);
    });
  });
};

module.exports = { addSocketIO };
