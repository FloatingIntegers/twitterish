/* global createXhrHelpers, createDomHelpers */
// eslint-disable-next-line no-unused-vars
const createTweetHelpers = (XMLHttpRequest) => {
  const xhrHelpers = createXhrHelpers(XMLHttpRequest);
  const { addChildren, removeChildren } = createDomHelpers(document);

  const get = (cb) => {
    xhrHelpers.fetch('/get-tweets', strTweets => cb(JSON.parse(strTweets)));
  };

  const post = (tweet, cb) => {
    xhrHelpers.post('/set-tweet', { tweet }, cb);
  };

  const printTweetsToPage = (parentNode, tweets) => {
    removeChildren(parentNode);
    addChildren(tweets.map(tweet => tweet.un + ' said ' + tweet.tweet), parentNode);
  };

  return {
    get,
    post,
    printTweetsToPage,
  };
};
