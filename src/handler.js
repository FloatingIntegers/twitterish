const fs = require('fs');
const url = require('url');

function handler(req, res) {
  const urlData = url.parse(req.url);
  const pathName = urlData.pathname;

  if (pathName === '/') {
    fs.readFile(`${__dirname}/../public/index.html`, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.end('<h2>404 File not found</h2>');
      } else {
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end(data);
      }
    });
  }
}

module.exports = handler;
