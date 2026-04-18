/*global describe, it */
'use strict';

var assert = require('node:assert'),
		wayback = require('../lib/wayback');

var url = 'https://macbre.net';

describe('wayback API - integration test', function() {
	describe.skip('getClosest()', function() {
		it('should get the closest url on archive', function(done) {
			this.timeout(10000);
			wayback.getClosest(url, function(err, resp) {
				assert.ok(err === null);
				assert.ok(resp.available);
				done();
			});
		});
		it('should get the closest url while using options', function(done) {
			this.timeout(6000);
			var options = {'timeout': 5000};
			wayback.getClosest(url, options, function(err, resp) {
				assert.ok(err === null);
				assert.ok(resp.available);
				done();
			});
		});
		it('should throw an error on timeout', function(done) {
			// Force a timeout
			this.timeout(10000);
			var options = {'timeout': 100};
			wayback.getClosest(url, options, function(err, resp) {
				assert.ok(err !== null);
				assert.ok(err instanceof Error);
				assert.ok(resp === null);
				done();
			});
		});
	});

	describe('getTimeline()', function() {
		it('should get the timeline of url', function (done) {
			this.timeout(30_000);
			wayback.getTimeline(url, function (err, resp) {
				assert.ok(err === null);
				assert.ok(resp.original);

				// https://web.archive.org/web/20080529061028/http://macbre.net:80/
				assert.ok(resp.first.url.includes('/web.archive.org/'));
				assert.ok(resp.first.url.includes('/macbre.net'));
				assert.ok(resp.mementos.length > 0);
				done();
			});
		});
	});
});
