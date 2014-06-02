/**
 * Created by dseet on 6/2/2014.
 */
var http = require('http');
var parse = require('url').parse;
var join = require('path').join;
var fs = require('fs');

var root = __dirname;

var server = http.createServer(function (req, res) {
    if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        return res.end();
    }

    var url = parse(req.url);
    var path = join(root, url.pathname);
    fs.stat(path, function (err, stat) {
        if(err) {
            if('ENOENT' == err.code) {
                res.statusCode = 404;
                res.end('Not Found');
            } else {
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        } else {
            var stream = fs.createReadStream(path);
            stream.pipe(res);
            stream.on('error', function(err){
                res.statusCode = 500;
                res.end('Internal Server Error');
            });
            stream.on('end', function () {
                res.setHeader('Content-Length', stat.size);
            });
        }
    });
});



server.listen(3000);
