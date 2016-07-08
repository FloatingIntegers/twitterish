const tape = require('tape');
const shot = require('shot');
const handler = require('../src/handler.js');

tape('test that test environment is working', t => {
  shot.inject(handler, { method: 'get', url: '/' }, (res) => {
    t.equal(res.statusCode, 200, '/ has status code of 200');
    t.ok(res.payload.includes('<!DOCTYPE'), 'finds index.html file');
    t.equal(res.headers['Content-type'], 'text/html', 'response type is html');
    t.end();
  });
});
