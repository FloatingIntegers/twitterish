/* global io, createDomHelpers, createTweetHelpers */
((() => {
  // const tweetInput = document.getElementById('tweetInput');
  const dashboard = document.getElementById('dashboard');

  const tweetHelpers = createTweetHelpers(XMLHttpRequest);
  const printTweets = tweetHelpers.printTweetsToPage.bind(tweetHelpers, dashboard);

  const socket = io();

  // Emit tweet event with current tweet input
  // document.getElementById('tweetButton').addEventListener('click', () => {
  //   socket.emit('tweet', { tweet: tweetInput.value });
  // });

  // Update tweet display on tweet-update event
  socket.on('tweet-update', printTweets);
})());
