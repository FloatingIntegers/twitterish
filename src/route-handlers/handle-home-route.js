const fs = require('fs');

const handleHomeRoute = (response) => {
  fs.readFile(`${__dirname}/../../public/index.html`, (err, data) => {
    if (err) {
      response.writeHead(404, { 'Content-type': 'text/html' });
      response.end('<h2>404 File not found</h2>');
    } else {
      response.writeHead(200, { 'Content-type': 'text/html' });
      response.end(data);
    }
  });
};

module.exports = handleHomeRoute;
