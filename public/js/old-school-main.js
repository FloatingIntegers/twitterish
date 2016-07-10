/* global createTweetHelpers, printTweetsToPage, createDomHelpers */
((() => {
  const tweetInput = document.getElementById('tweetInput');
  const dashboard = document.getElementById('dashboard');

  const tweetHelpers = createTweetHelpers(XMLHttpRequest);
  const { addChildren, removeChildren } = createDomHelpers(document);

  const printTweetsToPage = (tweets) => {
    removeChildren(dashboard);
    addChildren(tweets.map(tweet => tweet.tweet), dashboard);
  };

  const updateTweets = () => {
    tweetHelpers.get((tweets) => {
      printTweetsToPage(JSON.parse(tweets));
    });
  };

  // Get all tweets on load
  updateTweets();

  // Post tweet on click event
  document.getElementById('tweetButton').addEventListener('click', () => {
    tweetHelpers.post(tweetInput.value, updateTweets);
  });
})());
