/*global describe, it */
'use strict';

var assert = require('assert'),
	fs = require('fs'),
	closest = require('../lib/closest');

describe('closest', function() {
	it('should provide an API', function() {
		assert.equal(typeof closest, 'object');
		assert.equal(typeof closest.parseClosest, 'function');
	});

	it('should parse a stream', function(done) {
		var input = fs.createReadStream(__dirname + '/fixtures/closest');

		closest.parseClosest(input, function(err, resp) {
			assert.ok(err === null);
			assert.ok(resp instanceof Object);

			assert.equal(typeof resp.url, 'string');
			assert.equal(typeof resp.timestamp, 'string');

			done();
		});
	});

	it('should throw an error on invalid stream', function(done) {
		var input = fs.createReadStream('/foo/bar');

		closest.parseClosest(input, function(err, resp) {
			assert.ok(err instanceof Error);
			assert.ok(resp === null);
			done();
		});
	});
});
