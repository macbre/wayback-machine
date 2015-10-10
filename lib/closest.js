'use strict';

var debug = require('debug')('wayback:closest'),
	split = require('split');

function parseClosest(input, callback) {
	debug('start');

	input.
		// errors handling
		on('error', function(err) {
			debug('error', err);
			callback(err, null);
		}).

		// split the input stream by newlines and parse as JSON
		pipe(split(JSON.parse)).

		// process the data
		on('data', function(data) {
			var closest = false;
			debug('data', data);

			if (data && data.archived_snapshots && data.archived_snapshots.closest) {
				closest = data.archived_snapshots.closest;
			}

			callback(null, closest);
		});
}

module.exports = {
	parseClosest: parseClosest
};
