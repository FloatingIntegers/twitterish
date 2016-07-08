const http = require('http');
const handler = require('./handler.js');
const port = process.env.PORT || 4000;
const socketIO = require('socket.io');

const app = http.createServer(handler);
const io = socketIO(app);

const redis = require('redis');

app.listen(port);


io.on('connection', socket => {
  console.log('user connected');

  const client = redis.createClient();
  client.lrange('tweets', 0, -1, (err, reply) => {
    const data = reply.map(JSON.parse);
    socket.emit('tweet-update', data);
  });

  socket.on('tweet', (data) => {
    console.log(data);
    const dateId = Date.now().toString();
    const tweetObj = Object.assign({ dateId }, data);
    client.lpush(['tweets', JSON.stringify(tweetObj)], () => {
      client.lrange('tweets', 0, -1, (err, reply) => {
        const data = reply.map(JSON.parse);
        io.emit('tweet-update', data);
      });
    });
  });
});

console.log(`Server is listening on port ${port}`);
