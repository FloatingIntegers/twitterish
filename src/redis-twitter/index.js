const redis = require('redis');
const promisify = require('../helpers/promisify');

let client;

const connect = () => {
  if (!client) client = redis.createClient();
};

const getTweets = (cb) => {
  client.lrange('tweets', 0, -1, (err, reply) => {
    const tweets = reply && reply.map(JSON.parse);
    cb(err, tweets);
  });
};

const addTweet = (tweet, cb) => {
  client.lpush('tweets', JSON.stringify(tweet), (err) => {
    cb(err);
  });
};

module.exports = {
  connect,
  addTweet,
  getTweets,
  addTweetsPromise: promisify(addTweet, this),
  getTweetsPromise: promisify(getTweets, this),
};
