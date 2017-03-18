'use strict';

var debug = require('debug')('wayback:main'),
	fetch = require('fetch').FetchStream,
	closest = require('./closest'),
	timemap = require('./timemap');

// a simple HTTP client wrapper returning a response stream
function request(url, options, callback) {
	if ((options instanceof Function) && (callback === null)) {
		callback = options;
	}

	var debug = require('debug')('wayback:http');
	debug('req', url);

	// @see https://www.npmjs.com/package/fetch
	var stream = new fetch(url, typeof options === 'object' ? options : undefined);

	stream.on('error', function(err) {
		debug('error', err);
		callback(err, null);
	});

	stream.on('meta', function(meta) {
		debug('resp', 'HTTP ' + meta.status);
		debug('resp', meta.responseHeaders);
		callback(null, stream);
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
