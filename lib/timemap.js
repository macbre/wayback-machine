var debug = require('debug')('wayback:timemap'),
	split = require('split');

var parseLineRegEx = /^(\w+)="(.*)"$/;

function parseLine(line) {
	// <http://web.archive.org/web/20150418105116/https://github.com/macbre>; rel="last memento"; datetime="Sat, 18 Apr 2015 10:51:16 GMT"
	var attrs = {},
		parts = line.split('; '),
		url = parts.shift();

	url = url.slice(1, -1); // will remove <> brakcers
	attrs.url = url;

	// parse attributes
	parts.
		map(function(part) {
			var matches = part.match(parseLineRegEx);

			return [
				matches[1], // e.g. rel
				matches[2]  // e.g. 'last memento'
			];
		}).
		forEach(function(parts) {
			var key = parts[0],
				val = parts[1];

			switch (key) {
				case 'rel':
					val.split(' ').forEach(function(entry) {
						attrs[entry] = true;
					});
					break;

				case 'datetime':
					attrs.datetime = new Date(val);
					break;
			}
		});

	return attrs;
}

function parseTimemap(input, callback) {
	var resp = {
		original: null,
		timegate: null,
		first: null,
		last: null,
		mementos: []
	};

	debug('start');

	input.
		// errors handling
		on('error', function(err) {
			debug('error', err);
			callback(err, null);
		}).

		// split the input stream by newlines
		// @see http://web.archive.org/web/timemap/link/github.com/macbre/
		pipe(split(',\n')).

		// process the data
		on('data', function(line) {
			var attrs = parseLine(line),
				url = attrs.url,
				urlWithTimestamp = {
					url: url,
					time: attrs.datetime
				};

			debug('line', line);
			debug('attrs', attrs);

			if (attrs.original) resp.original = url;
			if (attrs.timegate) resp.timegate = url;
			if (attrs.first)    resp.first = urlWithTimestamp;
			if (attrs.last)     resp.last = urlWithTimestamp;
			if (attrs.memento)  resp.mementos.push(urlWithTimestamp);
		}).
		on('end', function() {
			debug('end', resp);
			callback(null, resp);
		});
}

module.exports = {
	parseLine: parseLine,
	parseTimemap: parseTimemap
};
