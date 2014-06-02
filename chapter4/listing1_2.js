/**
 * Created by dseet on 6/2/2014.
 */
var http = require('http');
var url = require('url');
var items = [];

var server = http.createServer(function (req, res) {
    switch(req.method) {
        case 'POST':
            var item = '';
            req.setEncoding('utf8');
            req.on('data', function (chunk) {
               item += chunk;
            });
            req.on('end', function() {
               items.push(item);
                res.end('OK\n');
            });
            break;
        case 'GET':
            var body = items.map(function (item, i) {
                return i + ') ' + item;
            }).join('\n');
            res.setHeader('Content-Length', Buffer.byteLength(body));
            res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
            res.end(body);
            break;
        case 'DELETE':
            var path = url.parse(req.url).pathname;
            var id = parseInt(path.slice(1), 10);
            if(isNaN(id)) {
                res.statusCode = 400;
                res.end('Invalid item id');
            } else if(!items[id]) {
                res.statusCode = 404;
                res.end('Item not found');
            } else {
                items.splice(id, 1);
                res.end('OK\n');
            }
            break;
        case 'PUT':
            req.setEncoding('utf8');
            var item = '';
            req.on('data', function (chunk) {
                item += chunk;
            });
            req.on('end', function() {
                var path = url.parse(req.url).pathname;
                var id = parseInt(path.slice(1), 10);
                if(isNaN(id)) {
                    res.statusCode = 400;
                    res.end('Invalid item id');
                } else if(!items[id]) {
                    res.statusCode = 404;
                    res.end('Item not found');
                } else {
                    items[id] = item;
                    res.end('OK\n');
                }
            });
            break;
    }
});



server.listen(3000);
