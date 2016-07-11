/* global createTweetHelpers, printTweetsToPage, createDomHelpers */
((() => {
  const tweetInput = document.getElementById('tweetInput');
  const dashboard = document.getElementById('dashboard');

  const tweetHelpers = createTweetHelpers(XMLHttpRequest);
  const printTweets = tweetHelpers.printTweetsToPage.bind(tweetHelpers, dashboard);

  const updateTweets = () => tweetHelpers.get(printTweets);

  // Get all tweets on load
  updateTweets();

  // Post tweet on click event and update tweets after load
  document.getElementById('tweetButton').addEventListener('click', () => {
    tweetHelpers.post(tweetInput.value, updateTweets);
  });
})());
