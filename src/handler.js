const url = require('url');
const { handleHomeRoute, handlePublicRoutes, handleSetTweet } = require('./route-handlers');

function handler(req, res) {
  const pathName = url.parse(req.url).pathname;

  if (pathName === '/') handleHomeRoute(res);
  else if (pathName === '/set-tweet') handleSetTweet(req, res);
  else handlePublicRoutes(pathName, res);
}

module.exports = handler;
