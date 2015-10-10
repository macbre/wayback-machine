# wayback-machine
Internet Wayback Machine Client

## API

### `getTimeline`

Get the timeline with all the snapshots of a given URL taken by http://web.archive.org

```js
var wayback = require('wayback-machine');

wayback.getTimeline(url, function(err, timeline) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Timeline for <%s>:', url);
  console.log(timeline);
});
```

Timeline example:

```
{ original: 'http://macbre.net',
  timegate: 'http://web.archive.org/web/http://macbre.net',
  first: 
   { url: 'http://web.archive.org/web/20080529061028/http://macbre.net/',
     time: Thu May 29 2008 08:10:28 GMT+0200 (CEST) },
  last: 
   { url: 'http://web.archive.org/web/20150801212811/http://macbre.net/',
     time: Sat Aug 01 2015 23:28:11 GMT+0200 (CEST) },
  mementos: 
   [ { url: 'http://web.archive.org/web/20080529061028/http://macbre.net/',
       time: Thu May 29 2008 08:10:28 GMT+0200 (CEST) },
     { url: 'http://web.archive.org/web/20080701120010/http://macbre.net/',
       time: Tue Jul 01 2008 14:00:10 GMT+0200 (CEST) },
     { url: 'http://web.archive.org/web/20080702181112/http://macbre.net/',
       time: Wed Jul 02 2008 20:11:12 GMT+0200 (CEST) },
       ...
     { url: 'http://web.archive.org/web/20150801212811/http://macbre.net/',
       time: Sat Aug 01 2015 23:28:11 GMT+0200 (CEST) } ] }
```
