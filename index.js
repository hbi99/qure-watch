
'use strict';

var events = ['add', 'change', 'unlink', 'addDir', 'unlinkDir', 'error', 'ready', 'raw'];

var accord = require('accord'),
	chokidar = require('chokidar'),
//	through2 = require('through2'),
	Duplex = require('readable-stream').Duplex;



module.exports = {
	init: function(path, cb) {
		
		var watcher = chokidar.watch(path, {
				ignored: /[\/\\]\./,
				persistent: true
			});

		watcher.on('all', function(event, path) {
			console.log(event, path);
		});

		var outputStream = new Duplex({
				objectMode: true,
				allowHalfOpen: true
			});

		outputStream._write = function _write(file, enc, done) {
			cb(file);
			this.push(file);
			done();
		};

		outputStream._read = function _read() { };

		outputStream.add = function add(newGlobs) {
		//	newGlobs = normalizeGlobs(newGlobs)
		//		.map(resolveGlob);
			watcher.add(newGlobs);
		//	globs.push.apply(globs, newGlobs);
		};
		outputStream.unwatch = watcher.unwatch.bind(watcher);
		outputStream.close = function () {
			watcher.close();
			this.emit('end');
		};

		return outputStream;

	}
};
