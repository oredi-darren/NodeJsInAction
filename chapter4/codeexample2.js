/**
 * Created by dseet on 6/2/2014.
 */
var http = require('http');
var body = "Hello World\n";
http.createServer(function (req, res) {
    res.setHeader('Content-Length', body.length);
    res.setHeader('Content-Type', 'text/plain');
    res.end(body);
}).listen(3000);
