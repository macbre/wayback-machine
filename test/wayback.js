/*global describe, it */
'use strict';

var assert = require('assert'),
		fs = require('fs'),
		wayback = require('../lib/wayback');

var url = 'http://automata.cc/thumb-chuck-wiimote.png';

describe('wayback API', function() {
	describe('getClosest()', function() {
		it('should get the closest url on archive', function(done) {
			wayback.getClosest(url, function(err, resp) {
				assert.ok(err === null);
				assert.ok(resp instanceof Object);
				assert.equal(resp.available, true);
				done();
			});
		});
		it('should get the closest url while using options', function(done) {
			this.timeout(6000);
			var options = {'timeout': 5000};
			wayback.getClosest(url, options, function(err, resp) {
				assert.ok(err === null);
				assert.ok(resp instanceof Object);
				assert.equal(resp.available, true);
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
});
