/* global io, createDomHelpers, createTweetHelpers */
((() => {
  const tweetInput = document.getElementById('tweetInput');
  const dashboard = document.getElementById('dashboard');

  const tweetHelpers = createTweetHelpers(XMLHttpRequest);
  const updateTweets = (tweets) => tweetHelpers.printTweetsToPage(dashboard, tweets);

  const socket = io();

  // Emit tweet event with current tweet input
  document.getElementById('tweetButton').addEventListener('click', () => {
    if (tweetInput.value.length < 1){
      return;
    }
    socket.emit('tweet', { tweet: tweetInput.value });
    tweetInput.value = '';
  });


  // Update tweet display on tweet-update event
  socket.on('tweet-update', updateTweets);
})());
