//* eslint-disable */
const tape = require('tape');
const {
  getContentTypeFromExtension,
} = require('../../src/request-helpers');

tape('getContentTypeFromExtension', t => {
  t.plan(1);
  t.equal(getContentTypeFromExtension('js'), 'text/js', 'handles text type files properly');
  t.end();
});
