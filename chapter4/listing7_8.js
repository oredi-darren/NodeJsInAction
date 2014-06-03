/**
 * Created by dseet on 6/2/2014.
 */
var http = require('http');
var qs = require('querystring');
var formidable = require('formidable');
var items = [];

var server = http.createServer(function (req, res) {

    if('/' == req.url) {
        switch(req.method) {
            case 'GET':
                show(req, res);
                break;
            case 'POST':
                upload(req, res);
                break;
            default:
                errorRequest(res, 400, 'Bad Request');
        }
    } else {
        errorRequest(res, 404, 'Not Found');
    }

    function show( req, res) {
        var html = '<!DOCTYPE html><html><head lang="en"><meta charset="UTF-8"><title>Formidable</title></head><body>'
            + '<h1>Formidable</h1>'
            + '<ul>'
            + items.map(function (item) {
                return '<li>' + item + '</li>';
            }).join('')
            + '</ul>'
            + '<form method="post" action="/" enctype="multipart/form-data">'
            + '<p><input type="text" name="item" /></p>'
            + '<p><input type="file" name="file" /></p>'
            + '<p><input type="submit" name="Add item" /></p>'
            + '</form></body></html>';
        res.setHeader('Content-Length', Buffer.byteLength(html));
        res.setHeader('Content-Type', 'text/html; charset="utf-8"');
        res.end(html);
    }

    function isFormData(req) {
        var type = req.headers['content-type'] || '';
        return 0 == type.indexOf('multipart/form-data');
    }

    function upload(req, res) {
        if(!isFormData(req)) {
            errorRequest(res, 400, 'Bad Request: expecting multipart/form-data');
        }
        var form = new formidable.IncomingForm();
        form.on('field', function (name, value) {
            console.log(name + ':' + value);
        });
        form.on('file', function (name, file) {
            console.log(name + ':' + JSON.stringify(file.toJSON()));
        });
        form.on('end', function () {
            res.end('upload complete!');
        });
        form.parse(req);

    }

    function errorRequest(res, statusCode, message) {
        res.statusCode = statusCode;
        res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
        res.end(message);
    }

});

server.listen(3000);
