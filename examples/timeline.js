#!/usr/bin/env node
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

	console.log('Timeline for <%s>:', url);
	console.log(timeline);
});
