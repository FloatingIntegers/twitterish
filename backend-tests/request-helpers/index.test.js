/* eslint-disable max-len */
const tape = require('tape');
const { EventEmitter } = require('events');
// const sinon = require('sinon');
const {
  getContentTypeFromExtension,
  getFileExtension,
  getContentType,
  getPostData,
} = require('../../src/request-helpers');

tape('getContentTypeFromExtension', t => {
  t.plan(3);
  t.equal(getContentTypeFromExtension('js'), 'text/js', 'handles text type files properly');
  t.equal(getContentTypeFromExtension('html'), 'text/html', 'handles text type files properly');
  t.equal(getContentTypeFromExtension('ico'), 'image/x-icon', 'handles ico file types files properly');
  t.end();
});

tape('getFileExtension', t => {
  t.plan(3);
  t.equal(getFileExtension('/a/file/path.html'), 'html', 'extracts simple file extensions');
  t.equal(getFileExtension('/a/file/path.js'), 'js', 'extracts simple file extensions');
  t.equal(getFileExtension('/a/file.with.dots/path.js'), 'js', 'extracts file extensions with complex paths');
  t.end();
});

tape('getContentType', t => {
  t.plan(2);
  t.equal(getContentType('a/file/path.html'), 'text/html', 'returns the correct content-type for simple file paths and types');
  t.equal(getContentType('a/complex.file/path.ico'), 'image/x-icon', 'returns the correct content-type for complex file paths and types');
  t.end();
});

tape('getPostData', t => {
  const request = new EventEmitter();
  t.plan(1);
  getPostData(request, (data) => {
    t.equal(data, 'this is a string', 'returns concatenated data from request');
    t.end();
  });

  request.emit('data', 'this ');
  request.emit('data', 'is a ');
  request.emit('data', 'string');
  request.emit('end');
});
