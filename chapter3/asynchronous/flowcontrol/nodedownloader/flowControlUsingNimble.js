/**
 * Created by dseet on 5/23/2014.
 */
var flow = require('nimble');
var exec = require('child_process').exec;

function downloadNodeVersion(version, destination, callback) {
    var url = 'http://nodejs.org/dist/node-v' + version + '.tar.gz';
    var filePath = destination + '/' + version + '.tgz';
    exec('curl ' + url + ' >' + filePath, callback);
}

flow.series([
    function(callback) {
        flow.parallel([
            function(callback) {
                console.log('Downloading Node v0.4.6...');
                downloadNodeVersion('0.4.6', './tmp', callback);
            },
            function(callback) {
                console.log('Downloading Node v0.4.7...');
                downloadNodeVersion('0.4.7', './tmp', callback);
            }
        ], callback);
    },
    function(callback) {
        console.log('Creating archive of downloaded files...');
        exec(
            'tar cvf node_distros.tar ./tmp/0.4.6.tqz ./tmp/0.4.7.tqz',
            function (error, stdout, stderr) {
                console.log('All done!');
                callback();
            }
        );
        flow.parallel([
            function(callback) {

                downloadNodeVersion('0.4.6', './tmp', callback);
            },
            function(callback) {
                console.log('Downloading Node v0.4.7...');
                downloadNodeVersion('0.4.7', './tmp', callback);
            }
        ], callback);
    }
]);