/**
 * Created by dseet on 5/23/2014.
 */
var events = require('events')
    , util = require('util')
    , fs = require('fs')
    , watchDir = './watch'
    , processedDir = './done';

function Watcher(watchDir, processedDir) {
    this.watchDir = watchDir;
    this.processedDir = processedDir;
}

util.inherits(Watcher, events.EventEmitter);

Watcher.prototype.watch = function () {
    watcher = this;
    fs.readdir(watcher.watchDir, function (err, files) {
        if (err) throw err;
        for (var index in files) {
            watcher.emit('process', files[index]);
        }
    });
};

Watcher.prototype.start = function () {
    var watcher = this;
    fs.watchFile(watcher.watchDir, function () {
        watcher.watch();
    });
};

var watcher = new Watcher(watchDir, processedDir);
watcher.on('process', function process(file) {
    var watchFile = this.watchDir + '/' + file;
    var processedFile = this.processedDir + '/' + file.toLowerCase();
    fs.rename(watchFile, processedFile, function (err) {
        if (err) throw err;
    })
});
watcher.start();
