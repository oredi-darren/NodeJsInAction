/**
 * Created by dseet on 6/2/2014.
 */
var http = require('http');
var qs = require('querystring');
var items = [];

var server = http.createServer(function (req, res) {

    if('/' == req.url) {
        switch(req.method) {
            case 'GET':
                show(res);
                break;
            case 'POST':
                add(req, res);
                break;
            default:
                errorRequest(res, 'Bad Request');
        }
    } else {
        errorRequest(res, 'Not Found');
    }

    function show(res) {
        var html = '<!DOCTYPE html><html><head lang="en"><meta charset="UTF-8"><title>Todo List</title></head><body>'
            + '<h1>Todo List</h1>'
            + '<ul>'
            + items.map(function (item) {
                return '<li>' + item + '</li>';
            }).join('')
            + '</ul>'
            + '<form method="post" action="/">'
            + '<p><input type="text" name="item" /></p>'
            + '<p><input type="submit" name="Add item" /></p>'
            + '</form></body></html>';
        res.setHeader('Content-Length', Buffer.byteLength(html));
        res.setHeader('Content-Type', 'text/html; charset="utf-8"');
        res.end(html);
    }

    function add(req, res) {
        var body = '';
        req.setEncoding('utf8');
        req.on('data', function (chunk) {
            body += chunk;
        });
        req.on('end', function () {
            var obj = qs.parse(body);
            items.push(obj.item);
            show(res);
        });
    }

    function errorRequest(res, message) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
        res.end(message);
    }

});

server.listen(3000);
