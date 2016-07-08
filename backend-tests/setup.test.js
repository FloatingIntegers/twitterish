const tape = require('tape');

tape('testing environment', t => {
  t.plan(1);
  t.ok(true, 'test environment working');
  t.end();
});
