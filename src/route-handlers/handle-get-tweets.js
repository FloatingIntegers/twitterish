const redis = require('redis');

const handleGetTweets = (request, response) => {
  const client = redis.createClient();
  client.lrange('tweets', 0, -1, (err, reply) => {
    const data = reply.map(JSON.parse);
    response.end(JSON.stringify(data));
  });
};

module.exports = handleGetTweets;
