var assert = require('assert'),
	fs = require('fs'),
	timemap = require('../lib/timemap');

describe('timemap', function() {
	it('should provide an API', function() {
		assert.equal(typeof timemap, 'object');
		assert.equal(typeof timemap.parseLine, 'function');
		assert.equal(typeof timemap.parseTimemap, 'function');
	});

	it('should parse a stream', function(done) {
		var input = fs.createReadStream(__dirname + '/fixtures/timemap');

		timemap.parseTimemap(input, function(err, resp) {
			assert.ok(err === null);
			assert.ok(resp instanceof Object);

			assert.equal(resp.original, 'http://github.com/macbre/');
			assert.equal(resp.timegate, 'http://web.archive.org/web/http://github.com/macbre/');

			assert.equal(resp.first.url, 'http://web.archive.org/web/20150223002207/https://github.com/macbre');
			assert.equal(resp.last.url, 'http://web.archive.org/web/20150418105116/https://github.com/macbre');

			assert.equal(resp.mementos.length, 2);

			done();
		});
	});

	it('should throw an error on invalid stream', function(done) {
		var input = fs.createReadStream('/foo/bar');

		timemap.parseTimemap(input, function(err, resp) {
			assert.ok(err instanceof Error);
			assert.ok(resp === null);
			done();
		});
	});
});
