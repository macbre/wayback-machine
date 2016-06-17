'use strict';

var debug = require('debug')('wayback:main'),
	http = require('http'),
	closest = require('./closest'),
	timemap = require('./timemap');

// a simple HTTP client
function request(url, options, callback) {
	if ((options instanceof Function) && (callback === null)) {
		callback = options;
	}

	var debug = require('debug')('wayback:http');
	debug('req', url);

	var req = http.get(url, function(res) {
		debug('resp', 'HTTP ' + res.statusCode);
		debug('resp', res.headers);

		if (res.statusCode === 200) {
			callback(null, res);
		}
		else {
			callback(new Error('HTTP ' + res.statusCode), null);
		}
	});

	if (options.timeout) {
		req.setTimeout(options.timeout);
		req.on('timeout', function(err) {
			var error = new Error("Request timed out");
			debug('error', error);
			callback(error, null);
		});
	}

	req.on('error', function(err) {
		debug('error', err);
		callback(err, null);
	});
}

function getClosest(url, options, callback) {
	var closestUrl = 'http://archive.org/wayback/available?url=' + encodeURIComponent(url);
	debug('closest', url);
	request(closestUrl, options, function(err, res) {
		if (err) {
			callback(err, null);
			return;
		}
		if ((options instanceof Function) && (typeof callback === 'undefined')) {
			closest.parseClosest(res, options);
		} else {
			closest.parseClosest(res, callback);
		}
	});
}

function getTimeline(url, callback) {
	var timelineUrl = 'http://web.archive.org/web/timemap/link/' + url;
	debug('timeline', url);

	request(timelineUrl, function(err, res) {
		if (err) {
			callback(err, null);
			return;
		}

		timemap.parseTimemap(res, callback);
	});
}

module.exports = {
	getClosest: getClosest,
	getTimeline: getTimeline
};
