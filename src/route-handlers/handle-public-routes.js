const fs = require('fs');
const { getContentType } = require('../request-helpers');

const handlePublicRoutes = (pathName, response) => {
  fs.readFile(`${__dirname}/../../public/${pathName}`, (err, data) => {
    if (err) {
      response.writeHead(404, { 'Content-type': 'text/html' });
      response.end('<h2>404 File not found</h2>');
    } else {
      response.writeHead(200, { 'Content-type': getContentType(pathName) });
      response.end(data);
    }
  });
};

module.exports = handlePublicRoutes;
