/**
 * Created by dseet on 6/2/2014.
 */
var http = require('http');
var url = 'http://google.com';
var body = '<p>Redirectly to <a href="' + url + '">' + url + '</a><p></p>';
http.createServer(function (req, res) {
    res.setHeader('Location', url);
    res.setHeader('Content-Length', body.length);
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 302;
    res.end(body);
}).listen(3000);
