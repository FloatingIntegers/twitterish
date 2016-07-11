/* global describe, beforeEach, afterEach, it, expect, jasmine
   createTweetHelpers */
describe('createTweetHelpers', () => {
  let tweetHelpers;

  beforeEach(() => {
    jasmine.Ajax.install();
    tweetHelpers = createTweetHelpers(XMLHttpRequest);
  });

  afterEach(() => {
    jasmine.Ajax.uninstall();
  });

  describe('get', () => {
    const testResponse = [{ tweet: 'a' }, { tweet: 'b' }, { tweet: 'c' }];

    it('sends an xhr GET request to /get-tweets', () => {
      tweetHelpers.get();
      const request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe('/get-tweets');
      expect(request.method).toBe('GET');
    });

    it('calls a callback with raw xhr responseText', () => {
      const callback = jasmine.createSpy('success');
      tweetHelpers.get(callback);

      expect(callback).not.toHaveBeenCalled();

      jasmine.Ajax.requests.mostRecent().respondWith({
        status: 200,
        contentType: 'text/plain',
        responseText: JSON.stringify(testResponse),
      });

      expect(callback).toHaveBeenCalledWith(testResponse);
    });
  });

  describe('post', () => {
    const testResponse = 'test response text';
    const tweet = 'this is a test tweet';

    it('sends an xhr POST request to /set-tweet', () => {
      tweetHelpers.post(tweet);
      const request = jasmine.Ajax.requests.mostRecent();
      expect(request.url).toBe('/set-tweet');
      expect(request.method).toBe('POST');
      expect(request.data()).toEqual({ tweet });
    });

    it('sends an xhr request and calls a callback with raw xhr responseText', () => {
      const callback = jasmine.createSpy('success');

      tweetHelpers.post({ tweet }, callback);

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
