# NPM interactive - Pluralsight

* non-blocking, so listens to events and emitters
* can create listener through `obj.on('eventname', callbackfunction))`
* in order to emit - `obj.emit({'eventname': 'something'})`

## Streams
* can pipe read streams into a write streams
* `reader.pipe(writer, options)`