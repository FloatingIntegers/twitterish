/* global describe, beforeEach, afterEach, it, expect, jasmine
   createXhrHelpers */
describe('createXhrHelpers', () => {
  let xhrHelpers;

  beforeEach(() => {
    jasmine.Ajax.install();
    xhrHelpers = createXhrHelpers(XMLHttpRequest);
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  describe('fetch', () => {
    const testUrl = '/some/url/path';
    const testResponse = 'test response text';

    it('sends an xhr GET request to provided url', () => {
      xhrHelpers.fetch(testUrl);
      const request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe('/some/url/path');
      expect(request.method).toBe('GET');
    });

    it('calls a callback with raw xhr responseText', () => {
      const callback = jasmine.createSpy('success');
      xhrHelpers.fetch(testUrl, callback);

      expect(callback).not.toHaveBeenCalled();

      jasmine.Ajax.requests.mostRecent().respondWith({
        status: 200,
        contentType: 'text/plain',
        responseText: testResponse,
      });

      expect(callback).toHaveBeenCalledWith(testResponse);
    });
  });

  describe('post', () => {
    const testUrl = '/some/url/path';
    const testResponse = 'test response text';
    const jsonData = { test: 'this is a test' };

    it('sends an xhr POST request to provided url', () => {
      xhrHelpers.post(testUrl, jsonData);
      const request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe('/some/url/path');
      expect(request.method).toBe('POST');
      expect(request.data()).toEqual(jsonData);
    });

    it('calls a callback with raw xhr responseText', () => {
      const callback = jasmine.createSpy('success');

      xhrHelpers.post(testUrl, jsonData, callback);

      expect(callback).not.toHaveBeenCalled();

      jasmine.Ajax.requests.mostRecent().respondWith({
        status: 200,
        contentType: 'text/plain',
        responseText: testResponse,
      });

      expect(callback).toHaveBeenCalledWith(testResponse);
    });
  });
});
