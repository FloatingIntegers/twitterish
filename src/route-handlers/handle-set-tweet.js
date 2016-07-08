const { getPostData } = require('../request-helpers');

const handleSetTweet = (request, response) => {
  getPostData(request, (data) => {
    // eslint-disable-next-line no-console
    console.log(JSON.parse(data));
    response.end();
  });
};

module.exports = handleSetTweet;
