const url = require('url');
const { handleHomeRoute, handlePublicRoutes, handleSetTweet } = require('./route-handlers');

function handler(req, res) {
  const pathName = url.parse(req.url).pathname;

  if (pathName === '/' && req.method === 'GET') handleHomeRoute(res);
  else if (pathName === '/set-tweet' && req.method === 'POST') handleSetTweet(req, res);
  else handlePublicRoutes(pathName, res);
}

module.exports = handler;
