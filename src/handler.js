const fs = require('fs');
const url = require('url');

const VALID_EXTS_TO_CONTENT_TYPE = {
  ico: 'image/x-icon',
};

function getContentTypeFromExtension(ext) {
  return VALID_EXTS_TO_CONTENT_TYPE[ext] || `text/${ext}`;
}

function getFileExtension(pathName) {
  const regExMatch = /\.(\w+)$/.exec(pathName);
  return regExMatch !== null ? regExMatch[1] : '';
}

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
  } else if (pathName === '/set-tweet') {
    console.log('setting tweet!');
    let requestData = '';
    req.on('data', chunk => requestData += chunk);
    req.on('end', () => {
      console.log(JSON.parse(requestData));
    })
  } else {
    const ext = getFileExtension(pathName);
    fs.readFile(`${__dirname}/../public/${pathName}`, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.end('<h2>404 File not found</h2>');
      } else {
        res.writeHead(200, { 'Content-type': getContentTypeFromExtension(ext) });
        res.end(data);
      }
    });
  }
}

module.exports = handler;
