#!/usr/bin/env node
'use strict';

var wayback = require('../'),
	url = process.argv[2];

if (!url) {
	console.error('Usage: %s <URL>', process.argv[1]);
	process.exit(1);
}

wayback.getClosest(url, function(err, closest) {
	if (err) {
		console.error(err);
		process.exit(2);
	}

	console.log('The closest snapshot for <%s>:', url);
	console.log(closest);
});
