const http = require('http');
const handler = require('./handler.js');
const port = process.env.PORT || 4000;

http.createServer(handler).listen(port);

// eslint-disable-next-line no-console
console.log(`Server is listening on port ${port}`);
