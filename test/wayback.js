/*global describe, it */
'use strict';

var assert = require('assert'),
    fs = require('fs'),
    wayback = require('../lib/wayback');

describe('wayback', function() {
  it('should throw an error on timeout', function(done) {
    // Force a timeout
    this.timeout(10000);
    var url = 'http://automata.cc/thumb-chuck-wiimote.png',
        options = {'timeout': 100};
    wayback.getClosest(url, options, function(err, resp) {
      assert.ok(err != null);
      assert.ok(err instanceof Error);
      assert.ok(resp === null);
      done();
    });
  });
});
