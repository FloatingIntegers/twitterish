/* eslint-disable no-console */
const http = require('http');
const handler = require('./handler.js');
const { addSocketIO } = require('./socket-io');

const port = process.env.PORT || 4000;

const app = http.createServer(handler);
addSocketIO(app);

app.listen(port);

console.log(`Server is listening on port ${port}`);
