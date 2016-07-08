const { getPostData } = require('../request-helpers');
const redis = require('redis');


const handleSetTweet = (request, response) => {
  getPostData(request, (data) => {
    const client = redis.createClient();
    const dateId = Date.now().toString();
    const tweetObj = Object.assign({ dateId }, JSON.parse(data));
    client.lpush(['tweets', JSON.stringify(tweetObj)]);
    response.end();
  });
};

module.exports = handleSetTweet;
