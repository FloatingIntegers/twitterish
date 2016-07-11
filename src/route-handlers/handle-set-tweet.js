const { getPostData } = require('../request-helpers');
// const redis = require('redis');
const redisTwitter = require('../redis-twitter');

const handleSetTweet = (request, response) => {
  getPostData(request, (data) => {
    redisTwitter.connect();
    const dateId = Date.now().toString();
    //eslint-disable-next-line
    const un = ['Cat', 'Dog', 'Panda', 'Chicken', 'Monkey', 'Giraffe', 'Squirrel', 'Pig', 'Mouse', 'Koala'];
    const randomIndex = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const tweetObj = Object.assign({ dateId, username: randomIndex(un) }, JSON.parse(data));
    redisTwitter.addTweet(tweetObj, () => {
      response.end();
    });
  });
};

module.exports = handleSetTweet;
