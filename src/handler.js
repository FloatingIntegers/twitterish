const fs = require('fs');
const url = require('url');
const {
  getPostData,
  getContentType,
} = require('./request-helpers');

function handler(req, res) {
  const pathName = url.parse(req.url).pathname;

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
  } else if (pathName === '/set-tweet') {
    getPostData(req, (data) => {
      // eslint-disable-next-line no-console
      console.log(JSON.parse(data));
    });
  } else {
    fs.readFile(`${__dirname}/../public/${pathName}`, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.end('<h2>404 File not found</h2>');
      } else {
        res.writeHead(200, { 'Content-type': getContentType(pathName) });
        res.end(data);
      }
    });
  }
}

module.exports = handler;
