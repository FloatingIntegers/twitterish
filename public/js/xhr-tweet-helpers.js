/* global createXhrHelpers */
// eslint-disable-next-line no-unused-vars
const createTweetHelpers = (XMLHttpRequest) => {
  const xhrHelpers = createXhrHelpers(XMLHttpRequest);

  const get = (cb) => {
    xhrHelpers.fetch('/get-tweets', cb);
  };

  const post = (tweet, cb) => {
    xhrHelpers.post('/set-tweet', { tweet }, cb);
  };

  return {
    get,
    post,
  };
};
