/* eslint-disable no-console */
const socketIO = require('socket.io');

const redisTwitter = require('../redis-twitter');
const logError = require('../helpers/log-error');

const addSocketIO = (app) => {
  const io = socketIO(app);

  io.on('connection', socket => {
    console.log('user connected');

    redisTwitter.connect();

    // On connection - get all tweets
    redisTwitter.getTweetsPromise()                           // Promise([Tweet])
      .then(tweets => socket.emit('tweet-update', tweets))    // Promise(undefined)
      .catch(logError);

    // redisTwitter.getTweets((err, tweets) => {
    //   if (err) throw err;
    //   socket.emit('tweet-update', tweets);
    // });

    // On tweet event handler - add tweet to redis
    // then get all tweets and emit an update event
    socket.on('tweet', (tweet) => {
      // Add data to tweet
      const tweetObj = Object.assign({ dateId: Date.now() }, tweet);

      redisTwitter.addTweetsPromise(tweetObj)                     // Promise(undefined)
        .then(redisTwitter.getTweetsPromise.bind(redisTwitter))   // Promise([Tweet])
        .then(tweets => socket.emit('tweet-update', tweets))      // Promise(undefined)
        .catch(logError);

      // redisTwitter.addTweet(tweetObj, (err) => {
      //   if (err) throw err;
      //   redisTwitter.getTweets((err2, tweets) => {
      //     if (err2) throw err2;
      //     socket.emit('tweet-update', tweets);
      //   });
      // });
    });
  });
};

module.exports = { addSocketIO };
