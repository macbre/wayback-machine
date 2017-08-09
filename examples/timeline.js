#!/usr/bin/env node
'use strict';

var wayback = require('../'),
	url = process.argv[2];

if (!url) {
	console.error('Usage: %s <URL>', process.argv[1]);
	process.exit(1);
}

wayback.getTimeline(url, function(err, timeline) {
	if (err) {
		console.error(err);
		process.exit(2);
	}

	console.error('# Timeline for <%s> (%d entries):', url, timeline.mementos.length);

	timeline.mementos.forEach(function(item) {
		var time = new Date(item.time);

		// @see https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
		// 2007-03-06   http://example.com
		console.log('%s\t%s', time.toISOString().substring(0, 10), item.url);
	});
});
