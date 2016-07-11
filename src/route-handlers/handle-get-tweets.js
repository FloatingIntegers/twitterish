const redisTwitter = require('../redis-twitter');

const handleGetTweets = (request, response) => {
  redisTwitter.connect();
  redisTwitter.getTweets((err, tweets) => {
    response.end(JSON.stringify(tweets));
  });
};

module.exports = handleGetTweets;
