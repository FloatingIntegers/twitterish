const url = require('url');
const { handleHomeRoute,
        handlePublicRoutes,
        handleSetTweet,
        handleGetTweets } = require('./route-handlers');

function handler(req, res) {
  const pathName = url.parse(req.url).pathname;

  if (pathName === '/' && req.method === 'GET') handleHomeRoute(res);
  else if (pathName === '/set-tweet' && req.method === 'POST') handleSetTweet(req, res);
  else if (pathName === '/get-tweets' && req.method === 'GET') handleGetTweets(req, res);
  else handlePublicRoutes(pathName, res);
}

module.exports = handler;
